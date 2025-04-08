import { useState } from "react";

const questions = [
  { text: "Devlet, büyük şirketleri denetlemeli ve gerektiğinde müdahale etmelidir.", axis: "economic" },
  { text: "Kadın ve erkek eşit haklara sahiptir ve bu anayasal olarak güvence altına alınmalıdır.", axis: "social" },
  { text: "Basın özgürlüğü her koşulda korunmalıdır.", axis: "authority" },
  { text: "Türk kimliği, etnik değil, vatandaşlık temelinde tanımlanmalıdır.", axis: "identity" },
  { text: "Mevcut siyasi partiler sistemi halkı temsil etmiyor.", axis: "anarchy" }
];

const options = [
  { label: "Kesinlikle Katılıyorum", value: 2 },
  { label: "Katılıyorum", value: 1 },
  { label: "Kararsızım", value: 0 },
  { label: "Katılmıyorum", value: -1 },
  { label: "Kesinlikle Katılmıyorum", value: -2 }
];

export default function App() {
  const [answers, setAnswers] = useState(Array(questions.length).fill(null));
  const [submitted, setSubmitted] = useState(false);

  const handleSelect = (qIndex, value) => {
    const newAnswers = [...answers];
    newAnswers[qIndex] = value;
    setAnswers(newAnswers);
  };

  const calculateResults = () => {
    const axes = { economic: 0, social: 0, authority: 0, identity: 0, anarchy: 0 };
    questions.forEach((q, i) => {
      if (answers[i] !== null) {
        axes[q.axis] += answers[i];
      }
    });
    return axes;
  };

  const getLabel = (axes) => {
    const { economic, social, authority, identity, anarchy } = axes;
    if (anarchy > 4) return "Anarşist / Sistem karşıtı";
    if (economic >= 2 && social >= 2) return "Sol-Libertaryen";
    if (economic >= 2 && social <= -2) return "Sol-Otoriter";
    if (economic <= -2 && social >= 2) return "Sağ-Libertaryen";
    if (economic <= -2 && social <= -2) return "Sağ-Otoriter";
    return "Merkezci / Kararsız";
  };

  const handleSubmit = () => {
    setSubmitted(true);
  };

  const results = calculateResults();
  const resultLabel = getLabel(results);

  return (
    <div style={{ maxWidth: "600px", margin: "0 auto", padding: "1rem" }}>
      <h1 style={{ fontSize: "1.5rem", marginBottom: "1rem" }}>Türkiye Politik Kimlik Testi</h1>
      {!submitted ? (
        <div>
          {questions.map((q, i) => (
            <div key={i} style={{ marginBottom: "1rem" }}>
              <p>{q.text}</p>
              <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
                {options.map((opt, j) => (
                  <button
                    key={j}
                    onClick={() => handleSelect(i, opt.value)}
                    style={{
                      padding: "0.5rem 1rem",
                      border: "1px solid #ccc",
                      backgroundColor: answers[i] === opt.value ? "#333" : "#fff",
                      color: answers[i] === opt.value ? "#fff" : "#000",
                      borderRadius: "4px"
                    }}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>
          ))}
          <button onClick={handleSubmit} style={{ marginTop: "1rem", padding: "0.5rem 1rem" }}>
            Testi Bitir
          </button>
        </div>
      ) : (
        <div>
          <h2>Sonucun:</h2>
          <p>{resultLabel}</p>
        </div>
      )}
    </div>
  );
}