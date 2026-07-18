# Insurance Cost Prediction

## Live Demo
- **Frontend:** https://insurance-cost-prediction.vercel.app/
- **Backend API:** https://insurance-cost-prediction-o4vl.onrender.com/docs

---

## What is this project?
A machine learning web app that predicts annual medical insurance
charges based on personal details like age, BMI, smoking status,
and region.

Built with Random Forest Regression, FastAPI, and React.

---

## The Business Problem
Insurance companies need to estimate how much a customer will cost
them in medical claims. This model predicts annual charges so
insurers can set fair premiums and customers can understand
what affects their insurance cost.

---

## Dataset
- Source: Kaggle — Medical Insurance Cost Dataset
- Rows: 1,338 records
- Columns: 7 features
- Target column: charges (annual medical cost in USD)

---

## Test the Model

### High Cost Profile (Smoker)
| Field | Value |
|-------|-------|
| Age | 50 |
| Sex | Male |
| BMI | 35 |
| Children | 3 |
| Smoker | Yes |
| Region | Northeast |

Expected result: ~$11,000 - $15,000

---

### Low Cost Profile (Non-Smoker)
| Field | Value |
|-------|-------|
| Age | 25 |
| Sex | Female |
| BMI | 22 |
| Children | 0 |
| Smoker | No |
| Region | Southwest |

Expected result: ~$3,000 - $5,000

---

## Algorithm — Random Forest Regression
Random Forest builds 100 decision trees and averages their predictions.

We applied log transformation to the target column (charges) because
the data was right-skewed (skewness = 1.52). After log transform
skewness dropped to -0.09 — almost perfectly balanced.

After predicting in log space we reverse the transform with expm1()
to get real dollar values.

---

## Evaluation Metrics
| Metric | Value | Meaning |
|--------|-------|---------|
| R² Score | 0.85 | Model explains 85% of cost variation |
| RMSE | $4,389 | Average prediction error in dollars |

---

## Key Insight — Smoking is the Biggest Factor
Smokers pay dramatically more than non-smokers with identical
profiles. This matches real-world insurance pricing where smoking
is the single biggest risk factor for medical costs.

---

## Tech Stack
| Layer | Technology |
|-------|------------|
| Model | Python, Scikit-learn, Random Forest |
| Backend | FastAPI, Uvicorn |
| Frontend | React, Vite |
| Deployment | Render (backend), Vercel (frontend) |

---

## Features Used
| Feature | Description | Values |
|---------|-------------|--------|
| age | Age of the person | Number |
| sex | Gender | male, female |
| bmi | Body Mass Index | Number (e.g. 27.5) |
| children | Number of children | 0-5 |
| smoker | Smoking status | yes, no |
| region | US region | northeast, northwest, southeast, southwest |