import sys
import os
os.environ["STREAMLIT_SERVER_PORT"]="8501"


sys.path.insert(0, os.path.dirname(__file__))

import streamlit as st
from careers import CAREERS, CATEGORIES
from scoring import calculate_matches

st.set_page_config(
    page_title="PathFinder — Career Path Guide",
    page_icon="🧭",
    layout="wide",
    initial_sidebar_state="collapsed",
)

# ── Session state defaults ────────────────────────────────────────────────────
def init_state():
    defaults = {
        "page": "home",
        "step": 0,
        "answers": {
            "subjects": None,
            "environment": None,
            "strengths": [],
            "motivation": None,
            "education": None,
            "personality": None,
        },
        "matches": [],
    }
    for k, v in defaults.items():
        if k not in st.session_state:
            st.session_state[k] = v

init_state()

# ── Helpers ───────────────────────────────────────────────────────────────────
def go(page: str):
    st.session_state.page = page
    st.rerun()

def reset_quiz():
    st.session_state.step = 0
    st.session_state.answers = {
        "subjects": None,
        "environment": None,
        "strengths": [],
        "motivation": None,
        "education": None,
        "personality": None,
    }
    st.session_state.matches = []

# ── Navigation bar ────────────────────────────────────────────────────────────
def navbar():
    col1, col2, col3, col4 = st.columns([2, 1, 1, 1])
    with col1:
        st.markdown("## 🧭 PathFinder")
    with col2:
        if st.button("🏠 Home", use_container_width=True):
            go("home")
    with col3:
        if st.button("🔍 Explore Careers", use_container_width=True):
            go("explore")
    with col4:
        if st.button("✏️ Take the Quiz", use_container_width=True, type="primary"):
            reset_quiz()
            go("quiz")
    st.divider()

# ─────────────────────────────────────────────────────────────────────────────
# PAGE: HOME
# ─────────────────────────────────────────────────────────────────────────────
def page_home():
    navbar()

    st.markdown(
        """
        <div style='text-align:center; padding: 2rem 0 1rem;'>
            <span style='font-size:1rem; background:#e8f4f8; color:#1a7fa8;
                         padding:.4rem 1.2rem; border-radius:999px; font-weight:600;'>
                🌟 Find your calling
            </span>
        </div>
        """,
        unsafe_allow_html=True,
    )

    st.markdown(
        "<h1 style='text-align:center; font-size:3rem; line-height:1.15;'>"
        "Discover the <span style='color:#1a7fa8;'>Career Path</span><br>"
        "You Were <span style='color:#c9820a;'>Meant For</span>"
        "</h1>",
        unsafe_allow_html=True,
    )

    st.markdown(
        "<p style='text-align:center; font-size:1.15rem; color:#555; max-width:600px; margin:1rem auto 2rem;'>"
        "Stop guessing about your future. Take our interactive assessment to match your "
        "unique strengths, interests, and personality to the perfect career."
        "</p>",
        unsafe_allow_html=True,
    )

    col_a, col_b, col_c = st.columns([1.5, 1, 1.5])
    with col_b:
        if st.button("🚀 Start the Assessment", use_container_width=True, type="primary"):
            reset_quiz()
            go("quiz")

    st.markdown("<br>", unsafe_allow_html=True)

    st.markdown("### Why use PathFinder?")
    c1, c2, c3 = st.columns(3)
    with c1:
        st.info("**🎯 Personalised Results**\n\nMatched to your interests, strengths, and lifestyle — not just a generic list.")
    with c2:
        st.info("**📋 6-Question Quiz**\n\nTakes under 3 minutes. No sign-up required. Get results instantly.")
    with c3:
        st.info("**🗺️ Clear Next Steps**\n\nEach career recommendation comes with an actionable roadmap to get started.")

    st.markdown("<br>", unsafe_allow_html=True)

    s1, s2, s3, s4 = st.columns(4)
    with s1:
        st.metric("Careers Covered", f"{len(CAREERS)}+")
    with s2:
        st.metric("Quiz Questions", "6")
    with s3:
        st.metric("Minutes to Complete", "< 3")
    with s4:
        st.metric("Top Matches Shown", "3")

    st.markdown("<br>", unsafe_allow_html=True)
    if st.button("🔍 Browse All Careers Instead"):
        go("explore")


# ─────────────────────────────────────────────────────────────────────────────
# PAGE: QUIZ
# ─────────────────────────────────────────────────────────────────────────────
QUESTIONS = [
    {
        "key": "subjects",
        "title": "What topics excite you most?",
        "subtitle": "Choose the area that genuinely interests you.",
        "type": "single",
        "options": [
            "Technology", "Arts & Design", "Business & Finance",
            "Healthcare", "Education", "Science & Research",
            "Social Work", "Engineering",
        ],
    },
    {
        "key": "environment",
        "title": "Where do you want to work?",
        "subtitle": "Pick the environment that feels right for you.",
        "type": "single",
        "options": [
            "Remote/Home", "Office/Corporate", "Outdoors/Field",
            "Hospital/Lab", "Creative Studio", "Flexible/Hybrid",
        ],
    },
    {
        "key": "strengths",
        "title": "What are your top strengths?",
        "subtitle": "Select up to 3 that best describe you.",
        "type": "multi",
        "max": 3,
        "options": [
            "Problem Solving", "Communication", "Creativity", "Leadership",
            "Attention to Detail", "Empathy", "Analytical Thinking", "Physical Dexterity",
        ],
    },
    {
        "key": "motivation",
        "title": "What motivates you most?",
        "subtitle": "Be honest — this shapes your match.",
        "type": "single",
        "options": [
            "Helping others", "Making money", "Creative expression",
            "Solving hard problems", "Making an impact", "Building things", "Learning constantly",
        ],
    },
    {
        "key": "education",
        "title": "What's your preferred education path?",
        "subtitle": "There's no wrong answer — it's about what fits your life.",
        "type": "single",
        "options": [
            "High School only", "Trade/Vocational", "Associate Degree",
            "Bachelor's Degree", "Master's or higher",
        ],
    },
    {
        "key": "personality",
        "title": "How would you describe your work style?",
        "subtitle": "Pick the one that resonates most.",
        "type": "single",
        "options": [
            "Leader", "Team Player", "Independent Worker",
            "Adaptable/Flexible", "Detail-Oriented",
        ],
    },
]

TOTAL_STEPS = len(QUESTIONS)


def page_quiz():
    navbar()

    step = st.session_state.step
    q = QUESTIONS[step]

    st.progress((step + 1) / TOTAL_STEPS)
    st.caption(f"Question {step + 1} of {TOTAL_STEPS}")

    st.markdown(f"### {q['title']}")
    st.markdown(f"*{q['subtitle']}*")
    st.markdown("")

    answers = st.session_state.answers

    if q["type"] == "single":
        current = answers.get(q["key"])
        cols = st.columns(2)
        chosen = None
        for i, option in enumerate(q["options"]):
            col = cols[i % 2]
            is_selected = current == option
            label = f"✅ {option}" if is_selected else option
            btn_type = "primary" if is_selected else "secondary"
            if col.button(label, key=f"opt_{step}_{i}", use_container_width=True, type=btn_type):
                chosen = option
        if chosen is not None:
            st.session_state.answers[q["key"]] = chosen
            st.rerun()
        selected_value = st.session_state.answers.get(q["key"])

    else:  # multi
        current_list = answers.get(q["key"], [])
        cols = st.columns(2)
        for i, option in enumerate(q["options"]):
            col = cols[i % 2]
            is_checked = option in current_list
            label = f"✅ {option}" if is_checked else option
            if col.button(label, key=f"opt_{step}_{i}", use_container_width=True,
                          type="primary" if is_checked else "secondary"):
                new_list = list(current_list)
                if is_checked:
                    new_list.remove(option)
                else:
                    if len(new_list) < q.get("max", 99):
                        new_list.append(option)
                    else:
                        st.warning(f"You can select at most {q['max']} options.")
                st.session_state.answers[q["key"]] = new_list
                st.rerun()
        selected_value = st.session_state.answers.get(q["key"], [])

    st.markdown("<br>", unsafe_allow_html=True)

    nav_l, nav_r = st.columns(2)
    with nav_l:
        if step > 0:
            if st.button("← Back", use_container_width=True):
                st.session_state.step -= 1
                st.rerun()

    with nav_r:
        is_answered = (
            bool(selected_value) if not isinstance(selected_value, list)
            else len(selected_value) > 0
        )
        if is_answered:
            label = "See My Results 🎉" if step == TOTAL_STEPS - 1 else "Next →"
            if st.button(label, use_container_width=True, type="primary"):
                if step == TOTAL_STEPS - 1:
                    matches = calculate_matches(st.session_state.answers)
                    st.session_state.matches = matches[:3]
                    go("results")
                else:
                    st.session_state.step += 1
                    st.rerun()
        else:
            st.button("Next →", disabled=True, use_container_width=True)


# ─────────────────────────────────────────────────────────────────────────────
# PAGE: RESULTS
# ─────────────────────────────────────────────────────────────────────────────
def page_results():
    navbar()

    matches = st.session_state.matches
    if not matches:
        st.warning("No results found. Please complete the quiz first.")
        if st.button("Take the Quiz"):
            reset_quiz()
            go("quiz")
        return

    st.markdown(
        "<h1 style='text-align:center;'>🏆 Your Path is Clear!</h1>",
        unsafe_allow_html=True,
    )
    st.markdown(
        "<p style='text-align:center; color:#555; font-size:1.1rem;'>"
        "Based on your answers, here are your top career matches.</p>",
        unsafe_allow_html=True,
    )
    st.markdown("<br>", unsafe_allow_html=True)

    for idx, match in enumerate(matches):
        c = match.career
        badge = "🥇 Top Match" if idx == 0 else f"🥈 Match #{idx + 1}" if idx == 1 else f"🥉 Match #{idx + 2}"

        with st.expander(
            f"{c.icon}  {c.title}  —  {match.percentage}% Match   {badge}",
            expanded=(idx == 0),
        ):
            col_left, col_right = st.columns([1, 2])

            with col_left:
                st.markdown(f"## {c.icon} {match.percentage}%")
                st.caption(c.category)
                st.markdown("**Why this matches you:**")
                for reason in match.match_reasons:
                    st.markdown(f"✅ {reason}")

            with col_right:
                st.markdown(f"**{c.description}**")
                st.markdown("")

                m1, m2 = st.columns(2)
                with m1:
                    st.metric("💰 Average Salary", c.salary)
                with m2:
                    st.metric("🎓 Education Required", c.education)

                st.markdown("**🧠 Key Skills**")
                st.markdown("  ".join(f"`{s}`" for s in c.skills))

                st.markdown("**🗺️ Next Steps**")
                for i, step_text in enumerate(c.next_steps, 1):
                    st.markdown(f"{i}. {step_text}")

        st.markdown("")

    st.divider()
    col_a, col_b = st.columns(2)
    with col_a:
        if st.button("🔄 Retake the Quiz", use_container_width=True):
            reset_quiz()
            go("quiz")
    with col_b:
        if st.button("🔍 Explore More Careers", use_container_width=True, type="primary"):
            go("explore")


# ─────────────────────────────────────────────────────────────────────────────
# PAGE: EXPLORE
# ─────────────────────────────────────────────────────────────────────────────
def page_explore():
    navbar()

    st.markdown("## 🔍 Explore All Careers")
    st.markdown("Browse the full library of career paths and find out what each one requires.")
    st.markdown("")

    col_search, col_filter = st.columns([2, 1])
    with col_search:
        search = st.text_input("Search careers…", placeholder="e.g. engineer, nurse, designer")
    with col_filter:
        cat_options = ["All Categories"] + CATEGORIES
        selected_cat = st.selectbox("Filter by category", cat_options)

    filtered = CAREERS
    if selected_cat != "All Categories":
        filtered = [c for c in filtered if c.category == selected_cat]
    if search:
        s = search.lower()
        filtered = [c for c in filtered if s in c.title.lower() or s in c.category.lower()
                    or any(s in sk.lower() for sk in c.skills)]

    st.caption(f"Showing {len(filtered)} career{'s' if len(filtered) != 1 else ''}")
    st.markdown("")

    if not filtered:
        st.info("No careers match your search. Try a different keyword or category.")
        return

    for row_start in range(0, len(filtered), 3):
        cols = st.columns(3)
        for col_idx, career in enumerate(filtered[row_start: row_start + 3]):
            with cols[col_idx]:
                with st.container(border=True):
                    st.markdown(f"### {career.icon} {career.title}")
                    st.caption(career.category)
                    st.markdown(career.description)
                    st.markdown(f"**Salary:** {career.salary}")
                    st.markdown(f"**Education:** {career.education}")
                    st.markdown("**Skills:** " + ", ".join(career.skills))


# ─────────────────────────────────────────────────────────────────────────────
# ROUTER
# ─────────────────────────────────────────────────────────────────────────────
page = st.session_state.page

if page == "home":
    page_home()
elif page == "quiz":
    page_quiz()
elif page == "results":
    page_results()
elif page == "explore":
    page_explore()
else:
    page_home()