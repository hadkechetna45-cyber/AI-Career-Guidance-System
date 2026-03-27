import pandas as pd
from sklearn.preprocessing import LabelEncoder
from sklearn.ensemble import RandomForestClassifier

# Load dataset
data = pd.read_csv("training_data.csv")

# Encode
encoders = {}
for col in data.columns:
    le = LabelEncoder()
    data[col] = le.fit_transform(data[col])
    encoders[col] = le

X = data.drop("career", axis=1)
y = data["career"]

# Train model
model = RandomForestClassifier(n_estimators=100)
model.fit(X, y)


def predict_top3(user_input):
    input_df = pd.DataFrame([user_input])

    for col in input_df.columns:
        input_df[col] = encoders[col].transform(input_df[col])

    probs = model.predict_proba(input_df)[0]
    top3_idx = probs.argsort()[-3:][::-1]

    careers = encoders["career"].inverse_transform(top3_idx)
    scores = probs[top3_idx]

    return list(zip(careers, scores))