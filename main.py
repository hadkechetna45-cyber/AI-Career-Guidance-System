def main():
  print("Hello from repl-nix-workspace!")

import streamlit as st


if __name__ == "__main__":
  main()
from ml_model import predict_top3

user_data = {
  "subjects": st.session_state.answers["subjects"],
  "environment": st.session_state.answers["environment"],
  "strengths": st.session_state.answers["strengths"][0] if st.session_state.answers["strengths"] else "Problem Solving",
  "motivation": st.session_state.answers["motivation"],
  "education": st.session_state.answers["education"],
  "personality": st.session_state.answers["personality"],
}

top3 = predict_top3(user_data)

st.session_state.matches = top3
go("results")