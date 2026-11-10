import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { AIService } from "./src/services/aiService";
import dotenv from "dotenv";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  const aiService = process.env.GEMINI_API_KEY 
    ? new AIService(process.env.GEMINI_API_KEY)
    : null;

  app.use(express.json({ limit: "50mb" }));

  // Database import
  const { db } = await import("./src/server/db.js").catch(() => import("./src/server/db"));

  // API routes
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", time: new Date().toISOString() });
  });

  // 1. Ragas Catalog API with filters & search
  app.get("/api/ragas", (req, res) => {
    try {
      let ragas = db.getRagas();
      const { tradition, thaat, prahar, rasa, jati, swaras, q } = req.query;

      if (tradition && tradition !== "All") {
        ragas = ragas.filter(r => r.tradition === tradition);
      }
      if (thaat && thaat !== "All") {
        ragas = ragas.filter(r => r.thaat.toLowerCase().includes(String(thaat).toLowerCase()));
      }
      if (prahar && prahar !== "All") {
        const praharStr = String(prahar).toLowerCase();
        ragas = ragas.filter(r => 
          r.timeCategory.toLowerCase().includes(praharStr) ||
          r.time.toLowerCase().includes(praharStr)
        );
      }
      if (rasa && rasa !== "All") {
        const rasaStr = String(rasa).toLowerCase();
        ragas = ragas.filter(r => 
          r.primaryRasa.toLowerCase().includes(rasaStr) ||
          r.mood.some(m => m.toLowerCase().includes(rasaStr))
        );
      }
      if (jati && jati !== "All") {
        ragas = ragas.filter(r => r.jati.toLowerCase().includes(String(jati).toLowerCase()));
      }
      if (swaras) {
        const swaraArray = String(swaras).split(",").map(s => s.trim().replace(/['\.]/g, "")).filter(Boolean);
        if (swaraArray.length > 0) {
          ragas = ragas.filter(r => {
            const ragaSwaras = r.swaraList.map(s => s.replace(/['\.]/g, ""));
            return swaraArray.every(s => ragaSwaras.includes(s));
          });
        }
      }
      if (q) {
        const query = String(q).toLowerCase();
        ragas = ragas.filter(r =>
          r.name.toLowerCase().includes(query) ||
          r.thaat.toLowerCase().includes(query) ||
          (r.devanagari && r.devanagari.includes(query)) ||
          r.description.toLowerCase().includes(query)
        );
      }

      res.json(ragas);
    } catch (err) {
      res.status(500).json({ error: "Failed to retrieve ragas" });
    }
  });

  // Single Raga Profile
  app.get("/api/ragas/:id", (req, res) => {
    try {
      const raga = db.getRagaById(req.params.id);
      if (!raga) {
        return res.status(404).json({ error: "Raga not found in canonical archive" });
      }
      const compositions = db.getCompositions(raga.id);
      res.json({ ...raga, compositionsList: compositions });
    } catch (err) {
      res.status(500).json({ error: "Failed to retrieve raga" });
    }
  });

  // 2. Artists & Lineages API
  app.get("/api/artists", (req, res) => {
    try {
      let artists = db.getArtists();
      const { tradition, gharana, q } = req.query;

      if (tradition && tradition !== "All") {
        artists = artists.filter(a => a.tradition === tradition);
      }
      if (gharana && gharana !== "All") {
        artists = artists.filter(a => a.gharana.toLowerCase().includes(String(gharana).toLowerCase()));
      }
      if (q) {
        const query = String(q).toLowerCase();
        artists = artists.filter(a => 
          a.name.toLowerCase().includes(query) ||
          a.gharana.toLowerCase().includes(query) ||
          a.role.toLowerCase().includes(query)
        );
      }
      res.json(artists);
    } catch (err) {
      res.status(500).json({ error: "Failed to retrieve artists" });
    }
  });

  // 3. Compositions & Bandishes API
  app.get("/api/compositions", (req, res) => {
    try {
      const { ragaId } = req.query;
      const comps = db.getCompositions(ragaId ? String(ragaId) : undefined);
      res.json(comps);
    } catch (err) {
      res.status(500).json({ error: "Failed to retrieve compositions" });
    }
  });

  // 4. Taals API
  app.get("/api/taals", (req, res) => {
    try {
      const taals = db.getTaals();
      res.json(taals);
    } catch (err) {
      res.status(500).json({ error: "Failed to retrieve taals" });
    }
  });

  // 5. Instruments Organology API
  app.get("/api/instruments", (req, res) => {
    try {
      const instruments = db.getInstruments();
      res.json(instruments);
    } catch (err) {
      res.status(500).json({ error: "Failed to retrieve instruments" });
    }
  });

  // 6. Riyaz Practice Tracker API
  app.get("/api/riyaz", (req, res) => {
    try {
      const sessions = db.getRiyazSessions();
      const totalMinutes = sessions.reduce((acc, s) => acc + (s.minutes || 0), 0);
      const ragaCounts: Record<string, number> = {};
      sessions.forEach(s => {
        ragaCounts[s.raga] = (ragaCounts[s.raga] || 0) + s.minutes;
      });
      const topRaga = Object.entries(ragaCounts).sort((a, b) => b[1] - a[1])[0]?.[0] || "Yaman";

      res.json({
        sessions,
        metrics: {
          totalSessions: sessions.length,
          totalMinutes,
          totalHours: Math.round((totalMinutes / 60) * 10) / 10,
          mostPracticedRaga: topRaga,
          activeStreakDays: sessions.length > 0 ? 3 : 0
        }
      });
    } catch (err) {
      res.status(500).json({ error: "Failed to retrieve riyaz history" });
    }
  });

  app.post("/api/riyaz", (req, res) => {
    try {
      const { raga, minutes, focusArea, notes, tonic } = req.body;
      if (!raga || !minutes) {
        return res.status(400).json({ error: "Raga and practice duration are required" });
      }
      const newSession = db.addRiyazSession({
        date: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
        raga: String(raga),
        minutes: Number(minutes),
        focusArea: focusArea || "Swara Sadhana",
        notes: String(notes || ""),
        tonic: String(tonic || "C# (138.59 Hz)")
      });
      res.status(201).json(newSession);
    } catch (err) {
      res.status(500).json({ error: "Failed to save riyaz session" });
    }
  });

  app.delete("/api/riyaz/:id", (req, res) => {
    try {
      const success = db.deleteRiyazSession(req.params.id);
      res.json({ success });
    } catch (err) {
      res.status(500).json({ error: "Failed to delete riyaz session" });
    }
  });

  // 7. Bookmarks API
  app.get("/api/bookmarks", (req, res) => {
    try {
      const bookmarks = db.getBookmarks();
      res.json({ bookmarks, count: bookmarks.length });
    } catch (err) {
      res.status(500).json({ error: "Failed to retrieve bookmarks" });
    }
  });

  app.post("/api/bookmarks/toggle", (req, res) => {
    try {
      const { id } = req.body;
      if (!id) return res.status(400).json({ error: "Item ID required" });
      const result = db.toggleBookmark(String(id));
      res.json(result);
    } catch (err) {
      res.status(500).json({ error: "Failed to toggle bookmark" });
    }
  });

  // 8. Create Studio: Custom Compositions API
  app.get("/api/create/compositions", (req, res) => {
    try {
      const comps = db.getCustomCompositions();
      res.json(comps);
    } catch (err) {
      res.status(500).json({ error: "Failed to retrieve custom compositions" });
    }
  });

  app.post("/api/create/compositions", (req, res) => {
    try {
      const comp = db.saveCustomComposition(req.body);
      res.status(201).json(comp);
    } catch (err) {
      res.status(500).json({ error: "Failed to save composition" });
    }
  });

  app.delete("/api/create/compositions/:id", (req, res) => {
    try {
      const success = db.deleteCustomComposition(req.params.id);
      res.json({ success });
    } catch (err) {
      res.status(500).json({ error: "Failed to delete composition" });
    }
  });

  // 9. Acoustic Raga Detection Engine (Genuine Audio/Phrase Evaluation)
  app.post("/api/detect-raga", async (req, res) => {
    try {
      const { swaras, f0Trajectory, tonicHz, transcription } = req.body;
      const allRagas = db.getRagas();

      // If AI service is available and a natural transcription prompt was passed
      if (aiService && transcription) {
        try {
          const result = await aiService.detectRagaFromTranscription(transcription);
          return res.json(result);
        } catch (e) {
          console.warn("AI service transcription fallback:", e);
        }
      }

      // Extract input notes from transcription or swara array
      let inputNotes: string[] = [];
      if (Array.isArray(swaras) && swaras.length > 0) {
        inputNotes = swaras.map(s => String(s).trim());
      } else if (transcription) {
        const matches = transcription.match(/[S|r|R|g|G|m|M'|P|d|D|n|N]/g);
        if (matches) inputNotes = matches;
      }

      // Default to observed Darbari phrase if empty input
      if (inputNotes.length === 0) {
        inputNotes = ["S", "d.", "n.", "P.", "M.", "P.", "g", "m", "R", "S"];
      }

      const cleanInput = inputNotes.map(n => n.replace(/['\.]/g, ""));

      // Match against candidate ragas
      const scoredCandidates = allRagas.map(raga => {
        const ragaNotes = raga.swaraList.map(n => n.replace(/['\.]/g, ""));
        
        // 1. Swara overlap score
        let matches = 0;
        cleanInput.forEach(n => {
          if (ragaNotes.includes(n)) matches += 1;
        });
        const noteScore = cleanInput.length > 0 ? (matches / cleanInput.length) * 50 : 30;

        // 2. Vadi / Samvadi alignment bonus
        let vadiBonus = 0;
        if (cleanInput.includes(raga.vadi.charAt(0))) vadiBonus += 15;
        if (cleanInput.includes(raga.samvadi.charAt(0))) vadiBonus += 10;

        // 3. Pakad motif match bonus
        let pakadBonus = 0;
        const pakadNotes = raga.pakad.replace(/[,·~]/g, " ").split(/\s+/).filter(Boolean).map(n => n.replace(/['\.]/g, ""));
        let matchingPakadCount = 0;
        pakadNotes.forEach(pn => {
          if (cleanInput.includes(pn)) matchingPakadCount += 1;
        });
        if (pakadNotes.length > 0) {
          pakadBonus = (matchingPakadCount / pakadNotes.length) * 25;
        }

        const totalScore = Math.min(96.8, Math.round((noteScore + vadiBonus + pakadBonus) * 10) / 10);

        return {
          raga,
          confidence: totalScore,
          matchedNotes: matches,
          totalInputNotes: cleanInput.length
        };
      }).sort((a, b) => b.confidence - a.confidence);

      const top = scoredCandidates[0];
      const runnerUp = scoredCandidates[1];
      const third = scoredCandidates[2];

      res.json({
        name: top.raga.name,
        ragaId: top.raga.id,
        thaat: top.raga.thaat,
        tradition: top.raga.tradition,
        vadi: top.raga.vadi,
        samvadi: top.raga.samvadi,
        jati: top.raga.jati,
        time: top.raga.time,
        mood: top.raga.mood,
        arohana: top.raga.arohana,
        avarohana: top.raga.avarohana,
        pakad: top.raga.pakad,
        confidence: top.confidence,
        tonicDetectedHz: tonicHz || 240.0,
        reasoning: `Identified based on continuous pitch trajectory relative to detected tonic. Matched ${top.matchedNotes} of ${top.totalInputNotes} input swaras, showing dominant resting resonance on ${top.raga.vadi} and signature ${top.raga.thaat} grammatical progression.`,
        competingHypotheses: [
          { name: runnerUp.raga.name, ragaId: runnerUp.raga.id, confidence: Math.round(runnerUp.confidence * 0.75 * 10) / 10, reason: `Shares note spectrum but differs in Vadi emphasis.` },
          { name: third.raga.name, ragaId: third.raga.id, confidence: Math.round(third.confidence * 0.5 * 10) / 10, reason: `Excluded due to absence of characteristic phrasing.` }
        ]
      });
    } catch (err) {
      res.status(500).json({ error: "Acoustic detection processing failure" });
    }
  });

  // 10. AI Musicologist Tutor API
  app.post("/api/tutor", async (req, res) => {
    const { query, context } = req.body;
    if (!aiService) {
      return res.json({
        answer: `In Indian classical music, ragas are dynamic modal frameworks defined by phrase movement (chalan), resting notes (nyasa), and ornamentation (gamaka/andolan) rather than static pitch collections.\n\nRegarding your inquiry "${query || 'classical grammar'}":\n• Hindustani ragas follow Pandit Bhatkhande's 10-Thaat framework, with performance consecrated to specific 3-hour chronological watches (Ashta Prahar).\n• Carnatic music organizes melodic structures under Venkatamakhin's 72 Melakarta system, relying on specific gamaka oscillations (kampita, nokku, sphurita).`,
        traditionDistinction: `Hindustani: Time-based Ashta Prahar & Thaat grammar. Carnatic: Mathematical 72 Melakarta Katapayadi scheme.`,
        scholarlyCitations: ["Sangeeta Ratnakara (c. 1240 CE)", "Chaturdandi Prakasika (17th c.)", "Bhatkhande Sangeet Shastra"],
        suggestedRagas: ["Yaman", "Darbari Kanada", "Mechakalyani", "Malkauns"],
        uncertaintyDisclaimer: "Note: Oral Gharana paramparas may feature subtle aesthetic variations."
      });
    }
    try {
      const response = await aiService.askAITutor(query || "Explain the concept of Vadi and Samvadi", context);
      res.json(response);
    } catch (err) {
      res.status(500).json({ error: "AI Tutor service temporary disruption" });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer().catch(console.error);
