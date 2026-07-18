import { useState } from "react"

export default function App() {
  const [form, setForm] = useState({
    age: "",
    sex: "male",
    bmi: "",
    children: "",
    smoker: "no",
    region: "northeast"
  })
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async () => {
    setLoading(true)
    try {
      const response = await fetch("https://insurance-cost-prediction-o4vl.onrender.com/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          age: parseInt(form.age) || 0,
          sex: form.sex,
          bmi: parseFloat(form.bmi) || 0,
          children: parseInt(form.children) || 0,
          smoker: form.smoker,
          region: form.region,
        }),
      })
      const data = await response.json()
      setResult(data.predicted_charges)
    } catch (err) {
      alert("Error connecting to API")
    }
    setLoading(false)
  }

  return (
    <div style={{ maxWidth: "500px", margin: "50px auto", fontFamily: "sans-serif", padding: "20px" }}>
      <h1 style={{ textAlign: "center", fontSize: "24px" }}>Insurance Cost Predictor</h1>
      <p style={{ textAlign: "center", color: "#666" }}>Enter your details to predict medical insurance cost</p>

      <div style={{ marginBottom: "12px" }}>
        <label style={{ fontWeight: "bold", display: "block", marginBottom: "4px" }}>Age</label>
        <input name="age" placeholder="Enter age" onChange={handleChange}
          style={{ width: "100%", padding: "8px", borderRadius: "4px", border: "1px solid #ccc", boxSizing: "border-box" }} />
      </div>

      <div style={{ marginBottom: "12px" }}>
        <label style={{ fontWeight: "bold", display: "block", marginBottom: "4px" }}>Sex</label>
        <select name="sex" onChange={handleChange}
          style={{ width: "100%", padding: "8px", borderRadius: "4px", border: "1px solid #ccc", boxSizing: "border-box" }}>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
      </div>

      <div style={{ marginBottom: "12px" }}>
        <label style={{ fontWeight: "bold", display: "block", marginBottom: "4px" }}>BMI</label>
        <input name="bmi" placeholder="Enter BMI (e.g. 27.5)" onChange={handleChange}
          style={{ width: "100%", padding: "8px", borderRadius: "4px", border: "1px solid #ccc", boxSizing: "border-box" }} />
      </div>

      <div style={{ marginBottom: "12px" }}>
        <label style={{ fontWeight: "bold", display: "block", marginBottom: "4px" }}>Children</label>
        <input name="children" placeholder="Number of children" onChange={handleChange}
          style={{ width: "100%", padding: "8px", borderRadius: "4px", border: "1px solid #ccc", boxSizing: "border-box" }} />
      </div>

      <div style={{ marginBottom: "12px" }}>
        <label style={{ fontWeight: "bold", display: "block", marginBottom: "4px" }}>Smoker</label>
        <select name="smoker" onChange={handleChange}
          style={{ width: "100%", padding: "8px", borderRadius: "4px", border: "1px solid #ccc", boxSizing: "border-box" }}>
          <option value="no">No</option>
          <option value="yes">Yes</option>
        </select>
      </div>

      <div style={{ marginBottom: "12px" }}>
        <label style={{ fontWeight: "bold", display: "block", marginBottom: "4px" }}>Region</label>
        <select name="region" onChange={handleChange}
          style={{ width: "100%", padding: "8px", borderRadius: "4px", border: "1px solid #ccc", boxSizing: "border-box" }}>
          <option value="northeast">Northeast</option>
          <option value="northwest">Northwest</option>
          <option value="southeast">Southeast</option>
          <option value="southwest">Southwest</option>
        </select>
      </div>

      <button onClick={handleSubmit} disabled={loading}
        style={{ width: "100%", padding: "12px", backgroundColor: "#1976D2", color: "white",
          border: "none", borderRadius: "4px", fontSize: "16px", cursor: "pointer", marginTop: "10px" }}>
        {loading ? "Predicting..." : "Predict Insurance Cost"}
      </button>

      {result !== null && (
        <div style={{ marginTop: "20px", padding: "20px", borderRadius: "8px",
          backgroundColor: "#e3f2fd", textAlign: "center" }}>
          <h2>Predicted Annual Cost</h2>
          <h1 style={{ color: "#1565C0" }}>${result.toLocaleString()}</h1>
        </div>
      )}
    </div>
  )
}
