import React from 'react';

interface QuestionGraphicProps {
  type: 'school' | 'question' | 'calendar' | 'exam' | 'social' | 'spacer';
  selectedValue?: string;
  stepId?: string;
}

export const QuestionGraphic: React.FC<QuestionGraphicProps> = ({
  type,
  selectedValue,
  stepId,
}) => {
  if (type === 'spacer' && !selectedValue) {
    return <div className="h-28 sm:h-32 flex-none" />;
  }

  // Determine dynamic theme based on type and selectedValue
  const getTheme = () => {
    // ----------------- QUESTION 1: ROLE (type: 'school') -----------------
    if (type === 'school') {
      if (selectedValue === 'Undergrad') {
        return {
          gradId: 'g_undergrad',
          stops: [
            { offset: '0%', color: '#3B82F6' },
            { offset: '100%', color: '#1D4ED8' },
          ],
          accentDot1: '#93C5FD',
          accentDot2: '#60A5FA',
          content: (
            <>
              {/* Mortarboard / Graduation cap */}
              <path
                d="M60 32 L92 46 L60 60 L28 46 Z"
                fill="#FFFFFF"
                className="drop-shadow-sm"
              />
              <path
                d="M40 52 V68 C40 76 80 76 80 68 V52"
                fill="#FFFFFF"
                opacity="0.9"
              />
              {/* Tassel */}
              <path
                d="M84 48 V64"
                stroke="#FDE047"
                strokeWidth="3.5"
                strokeLinecap="round"
              />
              <circle cx="84" cy="65" r="3" fill="#FACC15" />
              {/* Diploma Scroll */}
              <rect
                x="40"
                y="74"
                width="40"
                height="12"
                rx="4"
                fill="#FFFFFF"
              />
              <rect
                x="56"
                y="74"
                width="8"
                height="12"
                fill="#FDE047"
              />
            </>
          ),
        };
      }
      if (selectedValue === 'High School') {
        return {
          gradId: 'g_highschool',
          stops: [
            { offset: '0%', color: '#0284C7' },
            { offset: '100%', color: '#0369A1' },
          ],
          accentDot1: '#7DD3FC',
          accentDot2: '#BAE6FD',
          content: (
            <>
              {/* School building */}
              <path
                d="M60 25 L94 48 H26 Z"
                fill="none"
                stroke="#FFFFFF"
                strokeWidth="5.5"
                strokeLinejoin="round"
              />
              <path
                d="M60 25 V16"
                stroke="#FFFFFF"
                strokeWidth="4"
                strokeLinecap="round"
              />
              <path d="M60 16 H74 V24 Z" fill="#FACC15" />
              <path
                d="M36 48 V84 H84 V48"
                fill="none"
                stroke="#FFFFFF"
                strokeWidth="5.5"
                strokeLinejoin="round"
              />
              {/* School bell clock */}
              <circle cx="60" cy="58" r="7" fill="#FFFFFF" />
              <circle cx="60" cy="58" r="4.5" fill="#0284C7" />
              {/* Entrance Door */}
              <path
                d="M52 84 V70 A8 8 0 0 1 68 70 V84"
                fill="#FFFFFF"
              />
            </>
          ),
        };
      }
      if (selectedValue === 'Middle School') {
        return {
          gradId: 'g_middleschool',
          stops: [
            { offset: '0%', color: '#0EA5E9' },
            { offset: '100%', color: '#0284C7' },
          ],
          accentDot1: '#BAE6FD',
          accentDot2: '#38BDF8',
          content: (
            <>
              {/* School Backpack */}
              <rect
                x="38"
                y="38"
                width="44"
                height="46"
                rx="14"
                fill="#FFFFFF"
              />
              {/* Top Handle */}
              <path
                d="M48 38 V30 A12 12 0 0 1 72 30 V38"
                fill="none"
                stroke="#FFFFFF"
                strokeWidth="4.5"
                strokeLinecap="round"
              />
              {/* Front Pocket */}
              <rect
                x="44"
                y="54"
                width="32"
                height="22"
                rx="7"
                fill="#0284C7"
              />
              <rect
                x="56"
                y="62"
                width="8"
                height="4"
                rx="2"
                fill="#FACC15"
              />
            </>
          ),
        };
      }
      if (selectedValue === 'Grad Student') {
        return {
          gradId: 'g_gradstudent',
          stops: [
            { offset: '0%', color: '#7C3AED' },
            { offset: '100%', color: '#4C1D95' },
          ],
          accentDot1: '#DDD6FE',
          accentDot2: '#C4B5FD',
          content: (
            <>
              {/* Graduation Cap */}
              <path d="M60 28 L94 42 L60 56 L26 42 Z" fill="#FFFFFF" />
              {/* Thesis Scroll */}
              <rect
                x="35"
                y="58"
                width="50"
                height="22"
                rx="6"
                fill="#FFFFFF"
              />
              <path
                d="M42 66 H78 M42 72 H68"
                stroke="#7C3AED"
                strokeWidth="3"
                strokeLinecap="round"
              />
              {/* Medal / Ribbon */}
              <circle cx="60" cy="84" r="7" fill="#FACC15" />
              <path
                d="M55 88 L52 98 L60 94 L68 98 L65 88"
                fill="#EAB308"
              />
            </>
          ),
        };
      }
      if (selectedValue === 'Professional') {
        return {
          gradId: 'g_professional',
          stops: [
            { offset: '0%', color: '#059669' },
            { offset: '100%', color: '#064E3B' },
          ],
          accentDot1: '#A7F3D0',
          accentDot2: '#6EE7B7',
          content: (
            <>
              {/* Briefcase */}
              <rect
                x="32"
                y="40"
                width="56"
                height="42"
                rx="9"
                fill="#FFFFFF"
              />
              {/* Briefcase Handle */}
              <path
                d="M48 40 V32 H72 V40"
                fill="none"
                stroke="#FFFFFF"
                strokeWidth="5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              {/* Center Lock & Straps */}
              <path d="M32 54 H88" stroke="#059669" strokeWidth="4" />
              <rect
                x="54"
                y="50"
                width="12"
                height="10"
                rx="2.5"
                fill="#FACC15"
              />
            </>
          ),
        };
      }
      if (selectedValue === 'Educator') {
        return {
          gradId: 'g_educator',
          stops: [
            { offset: '0%', color: '#E11D48' },
            { offset: '100%', color: '#9F1239' },
          ],
          accentDot1: '#FECDD3',
          accentDot2: '#FDA4AF',
          content: (
            <>
              {/* Teacher Apple */}
              <circle cx="53" cy="58" r="16" fill="#FFFFFF" />
              <circle cx="67" cy="58" r="16" fill="#FFFFFF" />
              {/* Apple Stem & Leaf */}
              <path
                d="M60 44 C60 36 68 34 68 34"
                stroke="#FFFFFF"
                strokeWidth="3.5"
                fill="none"
                strokeLinecap="round"
              />
              <path
                d="M62 38 C70 34 76 38 74 42 C68 44 64 42 62 38 Z"
                fill="#86EFAC"
              />
              {/* Open Textbook base */}
              <path
                d="M32 78 Q60 84 60 76 Q60 84 88 78 V88 Q60 92 60 84 Q60 92 32 88 Z"
                fill="#FFFFFF"
              />
            </>
          ),
        };
      }
      if (selectedValue === 'Other') {
        return {
          gradId: 'g_other_role',
          stops: [
            { offset: '0%', color: '#4F46E5' },
            { offset: '100%', color: '#312E81' },
          ],
          accentDot1: '#C7D2FE',
          accentDot2: '#A5B4FC',
          content: (
            <>
              {/* Curiosity Star Spark */}
              <polygon
                points="60,24 69,45 92,48 76,64 80,87 60,76 40,87 44,64 28,48 51,45"
                fill="#FFFFFF"
              />
              <circle cx="60" cy="56" r="6" fill="#FACC15" />
            </>
          ),
        };
      }
      // Default school
      return {
        gradId: 'gb1',
        stops: [
          { offset: '0%', color: '#4A79BE' },
          { offset: '100%', color: '#2E5590' },
        ],
        accentDot1: '#7FA8DC',
        accentDot2: '#9CC0E8',
        content: (
          <>
            <path
              d="M60 26 96 52H24Z"
              fill="none"
              stroke="#fff"
              strokeWidth="6"
              strokeLinejoin="round"
            />
            <path
              d="M60 26V15"
              stroke="#fff"
              strokeWidth="5"
              strokeLinecap="round"
            />
            <path d="M60 15h15v8Z" fill="#fff" />
            <path
              d="M36 52v34h48V52"
              fill="none"
              stroke="#fff"
              strokeWidth="6"
              strokeLinejoin="round"
            />
            <path d="M54 86V69a6 6 0 0 1 12 0v17" fill="#fff" />
            <rect x="42" y="59" width="10" height="10" rx="2.5" fill="#fff" />
            <rect x="68" y="59" width="10" height="10" rx="2.5" fill="#fff" />
          </>
        ),
      };
    }

    // ----------------- QUESTION 2: SUBJECT (type: 'question') -----------------
    if (type === 'question') {
      if (selectedValue === 'Biology') {
        return {
          gradId: 'g_bio',
          stops: [
            { offset: '0%', color: '#10B981' },
            { offset: '100%', color: '#047857' },
          ],
          accentDot1: '#A7F3D0',
          accentDot2: '#6EE7B7',
          content: (
            <>
              {/* DNA Helix */}
              <path
                d="M42 30 Q60 50 42 70 Q60 90 42 96"
                fill="none"
                stroke="#FFFFFF"
                strokeWidth="5"
                strokeLinecap="round"
              />
              <path
                d="M78 30 Q60 50 78 70 Q60 90 78 96"
                fill="none"
                stroke="#FFFFFF"
                strokeWidth="5"
                strokeLinecap="round"
              />
              {/* Base rungs */}
              <line x1="45" y1="36" x2="75" y2="36" stroke="#FFFFFF" strokeWidth="4" strokeLinecap="round" />
              <line x1="52" y1="50" x2="68" y2="50" stroke="#FDE047" strokeWidth="4" strokeLinecap="round" />
              <line x1="45" y1="64" x2="75" y2="64" stroke="#FFFFFF" strokeWidth="4" strokeLinecap="round" />
              <line x1="52" y1="78" x2="68" y2="78" stroke="#FDE047" strokeWidth="4" strokeLinecap="round" />
              <line x1="45" y1="92" x2="75" y2="92" stroke="#FFFFFF" strokeWidth="4" strokeLinecap="round" />
            </>
          ),
        };
      }
      if (selectedValue === 'Chemistry') {
        return {
          gradId: 'g_chem',
          stops: [
            { offset: '0%', color: '#06B6D4' },
            { offset: '100%', color: '#0891B2' },
          ],
          accentDot1: '#A5F3FC',
          accentDot2: '#67E8F9',
          content: (
            <>
              {/* Erlenmeyer Flask */}
              <path
                d="M52 28 H68 V42 L88 78 A8 8 0 0 1 81 89 H39 A8 8 0 0 1 32 78 L52 42 Z"
                fill="none"
                stroke="#FFFFFF"
                strokeWidth="5"
                strokeLinejoin="round"
              />
              {/* Liquid level */}
              <path
                d="M41 72 Q60 76 79 72 L82 79 A4 4 0 0 1 78 84 H42 A4 4 0 0 1 38 79 Z"
                fill="#A5F3FC"
              />
              {/* Bubbles */}
              <circle cx="60" cy="62" r="3.5" fill="#FFFFFF" />
              <circle cx="68" cy="54" r="2.5" fill="#FFFFFF" />
              <circle cx="52" cy="50" r="2.5" fill="#FFFFFF" />
            </>
          ),
        };
      }
      if (selectedValue === 'Psychology') {
        return {
          gradId: 'g_psych',
          stops: [
            { offset: '0%', color: '#A855F7' },
            { offset: '100%', color: '#6B21A8' },
          ],
          accentDot1: '#F3E8FF',
          accentDot2: '#E9D5FF',
          content: (
            <>
              {/* Stylized Brain Synapses */}
              <circle cx="48" cy="48" r="14" fill="#FFFFFF" opacity="0.9" />
              <circle cx="72" cy="48" r="14" fill="#FFFFFF" opacity="0.9" />
              <circle cx="46" cy="68" r="13" fill="#FFFFFF" opacity="0.9" />
              <circle cx="74" cy="68" r="13" fill="#FFFFFF" opacity="0.9" />
              <circle cx="60" cy="58" r="11" fill="#FFFFFF" />
              {/* Glowing Synapse Center */}
              <polygon
                points="60,34 64,52 82,56 66,66 68,84 56,72 40,80 48,64 36,52 54,52"
                fill="#FDE047"
                opacity="0.9"
              />
            </>
          ),
        };
      }
      if (selectedValue === 'Mathematics') {
        return {
          gradId: 'g_math',
          stops: [
            { offset: '0%', color: '#F59E0B' },
            { offset: '100%', color: '#B45309' },
          ],
          accentDot1: '#FEF3C7',
          accentDot2: '#FDE68A',
          content: (
            <>
              {/* Pi π symbol */}
              <text
                x="38"
                y="65"
                fontSize="38"
                fontWeight="900"
                textAnchor="middle"
                fill="#FFFFFF"
                fontFamily="Georgia, serif"
              >
                π
              </text>
              {/* Sigma ∑ symbol */}
              <text
                x="78"
                y="65"
                fontSize="38"
                fontWeight="900"
                textAnchor="middle"
                fill="#FFFFFF"
                fontFamily="Georgia, serif"
              >
                ∑
              </text>
              {/* Math symbols bar */}
              <path
                d="M32 78 H52 M42 68 V88 M68 83 H88 M68 76 H88"
                stroke="#FFFFFF"
                strokeWidth="4"
                strokeLinecap="round"
              />
            </>
          ),
        };
      }
      if (selectedValue === 'Computer Science') {
        return {
          gradId: 'g_cs',
          stops: [
            { offset: '0%', color: '#2563EB' },
            { offset: '100%', color: '#1E3A8A' },
          ],
          accentDot1: '#BFDBFE',
          accentDot2: '#93C5FD',
          content: (
            <>
              {/* Code Editor Bracket </ > */}
              <rect
                x="28"
                y="32"
                width="64"
                height="50"
                rx="8"
                fill="#0F172A"
                stroke="#FFFFFF"
                strokeWidth="4"
              />
              <path
                d="M44 48 L37 57 L44 66"
                fill="none"
                stroke="#38BDF8"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M76 48 L83 57 L76 66"
                fill="none"
                stroke="#38BDF8"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <line
                x1="65"
                y1="46"
                x2="55"
                y2="68"
                stroke="#FACC15"
                strokeWidth="3.5"
                strokeLinecap="round"
              />
              {/* Binary dots */}
              <circle cx="36" cy="38" r="2" fill="#F87171" />
              <circle cx="42" cy="38" r="2" fill="#FBBF24" />
              <circle cx="48" cy="38" r="2" fill="#4ADE80" />
            </>
          ),
        };
      }
      if (selectedValue === 'English') {
        return {
          gradId: 'g_english',
          stops: [
            { offset: '0%', color: '#F43F5E' },
            { offset: '100%', color: '#9F1239' },
          ],
          accentDot1: '#FECDD3',
          accentDot2: '#FDA4AF',
          content: (
            <>
              {/* Open Hardcover Book */}
              <path
                d="M30 46 C45 42 60 48 60 48 C60 48 75 42 90 46 V80 C75 76 60 82 60 82 C60 82 45 76 30 80 Z"
                fill="#FFFFFF"
              />
              <line x1="60" y1="48" x2="60" y2="82" stroke="#F43F5E" strokeWidth="3" />
              {/* Feather Quill */}
              <path
                d="M72 26 C82 34 84 50 66 66 L64 74 L68 70 C72 62 86 52 86 36 C86 28 80 24 72 26 Z"
                fill="#FDE047"
              />
            </>
          ),
        };
      }
      if (selectedValue === 'Physics') {
        return {
          gradId: 'g_physics',
          stops: [
            { offset: '0%', color: '#6366F1' },
            { offset: '100%', color: '#3730A3' },
          ],
          accentDot1: '#C7D2FE',
          accentDot2: '#A5B4FC',
          content: (
            <>
              {/* Atom Orbit 1 */}
              <ellipse
                cx="60"
                cy="56"
                rx="34"
                ry="12"
                fill="none"
                stroke="#FFFFFF"
                strokeWidth="4"
                transform="rotate(30 60 56)"
              />
              {/* Atom Orbit 2 */}
              <ellipse
                cx="60"
                cy="56"
                rx="34"
                ry="12"
                fill="none"
                stroke="#FFFFFF"
                strokeWidth="4"
                transform="rotate(-30 60 56)"
              />
              {/* Nucleus */}
              <circle cx="60" cy="56" r="7" fill="#FACC15" />
              {/* Orbiting electrons */}
              <circle cx="85" cy="42" r="3.5" fill="#38BDF8" />
              <circle cx="35" cy="70" r="3.5" fill="#38BDF8" />
            </>
          ),
        };
      }
      if (selectedValue === 'History') {
        return {
          gradId: 'g_history',
          stops: [
            { offset: '0%', color: '#D97706' },
            { offset: '100%', color: '#78350F' },
          ],
          accentDot1: '#FDE68A',
          accentDot2: '#FBBF24',
          content: (
            <>
              {/* Ancient Greek / Roman Temple */}
              <polygon points="60,26 88,42 32,42" fill="#FFFFFF" />
              <rect x="32" y="42" width="56" height="5" fill="#FDE68A" />
              {/* Pillars */}
              <rect x="36" y="47" width="7" height="30" fill="#FFFFFF" rx="1.5" />
              <rect x="49" y="47" width="7" height="30" fill="#FFFFFF" rx="1.5" />
              <rect x="64" y="47" width="7" height="30" fill="#FFFFFF" rx="1.5" />
              <rect x="77" y="47" width="7" height="30" fill="#FFFFFF" rx="1.5" />
              {/* Temple Base */}
              <rect x="28" y="77" width="64" height="6" fill="#FFFFFF" rx="2" />
              <rect x="24" y="83" width="72" height="6" fill="#FDE68A" rx="2" />
            </>
          ),
        };
      }
      if (selectedValue === 'Economics') {
        return {
          gradId: 'g_econ',
          stops: [
            { offset: '0%', color: '#14B8A6' },
            { offset: '100%', color: '#0F766E' },
          ],
          accentDot1: '#CCFBF1',
          accentDot2: '#5EEAD4',
          content: (
            <>
              {/* Ascending Trend Line */}
              <path
                d="M32 78 L48 64 L62 70 L86 38"
                fill="none"
                stroke="#FFFFFF"
                strokeWidth="6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              {/* Arrow tip */}
              <polygon points="86,34 88,48 76,42" fill="#FFFFFF" />
              {/* Coin / Dollar Emblem */}
              <circle cx="50" cy="40" r="10" fill="#FACC15" />
              <text
                x="50"
                y="45"
                fontSize="14"
                fontWeight="900"
                textAnchor="middle"
                fill="#78350F"
              >
                $
              </text>
              {/* Bar graph accents */}
              <rect x="32" y="82" width="8" height="6" rx="2" fill="#FFFFFF" opacity="0.8" />
              <rect x="46" y="76" width="8" height="12" rx="2" fill="#FFFFFF" opacity="0.8" />
              <rect x="60" y="68" width="8" height="20" rx="2" fill="#FFFFFF" opacity="0.8" />
              <rect x="74" y="58" width="8" height="30" rx="2" fill="#FFFFFF" opacity="0.8" />
            </>
          ),
        };
      }
      if (selectedValue === 'Other') {
        return {
          gradId: 'g_other_subj',
          stops: [
            { offset: '0%', color: '#8B5CF6' },
            { offset: '100%', color: '#5B21B6' },
          ],
          accentDot1: '#DDD6FE',
          accentDot2: '#C4B5FD',
          content: (
            <>
              {/* Sparkle of ideas */}
              <circle cx="60" cy="52" r="18" fill="#FFFFFF" />
              <polygon points="60,24 64,44 84,48 68,60 72,80 60,68 48,80 52,60 36,48 56,44" fill="#FACC15" />
              <circle cx="60" cy="52" r="6" fill="#8B5CF6" />
            </>
          ),
        };
      }
      // Default Question
      return {
        gradId: 'gp1',
        stops: [
          { offset: '0%', color: '#7A6BD0' },
          { offset: '100%', color: '#53489E' },
        ],
        accentDot1: '#C9BCF5',
        accentDot2: '#C9BCF5',
        content: (
          <>
            <text
              x="62"
              y="80"
              fontSize="66"
              fontWeight="800"
              textAnchor="middle"
              fill="#453A85"
              fontFamily="-apple-system,Segoe UI,Roboto,sans-serif"
            >
              ?
            </text>
            <text
              x="60"
              y="78"
              fontSize="66"
              fontWeight="800"
              textAnchor="middle"
              fill="#C9BCF5"
              fontFamily="-apple-system,Segoe UI,Roboto,sans-serif"
            >
              ?
            </text>
          </>
        ),
      };
    }

    // ----------------- QUESTION 3: GRAD YEAR (type: 'calendar') -----------------
    if (type === 'calendar') {
      const yearText = selectedValue || '2026';
      return {
        gradId: 'g_cal_active',
        stops: selectedValue
          ? [
              { offset: '0%', color: '#2563EB' },
              { offset: '100%', color: '#1D4ED8' },
            ]
          : [
              { offset: '0%', color: '#4C7BC0' },
              { offset: '100%', color: '#33609E' },
            ],
        accentDot1: '#9CC0E8',
        accentDot2: '#B7D2F2',
        content: (
          <>
            <path
              d="M42 26v12M78 26v12"
              stroke="#fff"
              strokeWidth="6"
              strokeLinecap="round"
            />
            <rect
              x="28"
              y="34"
              width="64"
              height="54"
              rx="10"
              fill="none"
              stroke="#fff"
              strokeWidth="5.5"
            />
            <path d="M28 50h64" stroke="#fff" strokeWidth="5.5" />
            {selectedValue ? (
              <>
                {/* Year Bold Display */}
                <text
                  x="60"
                  y="74"
                  fontSize="17"
                  fontWeight="900"
                  textAnchor="middle"
                  fill="#FACC15"
                  fontFamily="-apple-system,Segoe UI,Roboto,sans-serif"
                >
                  {yearText}
                </text>
                {/* Graduation cap star */}
                <path
                  d="M60 40 L69 45 L60 50 L51 45 Z"
                  fill="#FFFFFF"
                />
              </>
            ) : (
              <>
                <g fill="#fff">
                  <circle cx="44" cy="63" r="3.4" />
                  <circle cx="58" cy="63" r="3.4" />
                  <circle cx="72" cy="63" r="3.4" />
                  <circle cx="44" cy="75" r="3.4" />
                  <circle cx="58" cy="75" r="3.4" />
                </g>
                <circle cx="76" cy="76" r="10" fill="#fff" />
                <path
                  d="M76 76v-6M76 76l4 3"
                  stroke="#4C7BC0"
                  strokeWidth="2.4"
                  strokeLinecap="round"
                />
              </>
            )}
          </>
        ),
      };
    }

    // ----------------- QUESTION 4: EXAM (type: 'exam') -----------------
    if (type === 'exam') {
      if (selectedValue === 'SAT') {
        return {
          gradId: 'g_sat',
          stops: [
            { offset: '0%', color: '#1D4ED8' },
            { offset: '100%', color: '#1E3A8A' },
          ],
          accentDot1: '#93C5FD',
          accentDot2: '#60A5FA',
          content: (
            <>
              <rect x="32" y="28" width="56" height="64" rx="8" fill="#FFFFFF" />
              <rect x="42" y="24" width="36" height="8" rx="4" fill="#FACC15" />
              <text
                x="60"
                y="52"
                fontSize="18"
                fontWeight="900"
                textAnchor="middle"
                fill="#1D4ED8"
                letterSpacing="1"
              >
                SAT
              </text>
              <rect x="42" y="60" width="36" height="4" rx="2" fill="#93C5FD" />
              <circle cx="60" cy="76" r="9" fill="#10B981" />
              <path d="M56 76 L59 79 L65 73" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
            </>
          ),
        };
      }
      if (selectedValue === 'ACT') {
        return {
          gradId: 'g_act',
          stops: [
            { offset: '0%', color: '#059669' },
            { offset: '100%', color: '#064E3B' },
          ],
          accentDot1: '#6EE7B7',
          accentDot2: '#A7F3D0',
          content: (
            <>
              <rect x="32" y="28" width="56" height="64" rx="8" fill="#FFFFFF" />
              <rect x="42" y="24" width="36" height="8" rx="4" fill="#FACC15" />
              <text
                x="60"
                y="52"
                fontSize="18"
                fontWeight="900"
                textAnchor="middle"
                fill="#059669"
                letterSpacing="1"
              >
                ACT
              </text>
              <circle cx="60" cy="74" r="12" fill="#FACC15" />
              <text
                x="60"
                y="79"
                fontSize="13"
                fontWeight="900"
                textAnchor="middle"
                fill="#064E3B"
              >
                36
              </text>
            </>
          ),
        };
      }
      if (selectedValue === 'AP exams') {
        return {
          gradId: 'g_ap',
          stops: [
            { offset: '0%', color: '#7C3AED' },
            { offset: '100%', color: '#4C1D95' },
          ],
          accentDot1: '#DDD6FE',
          accentDot2: '#C4B5FD',
          content: (
            <>
              <rect x="32" y="28" width="56" height="64" rx="8" fill="#FFFFFF" />
              <rect x="42" y="24" width="36" height="8" rx="4" fill="#FACC15" />
              <text
                x="60"
                y="50"
                fontSize="16"
                fontWeight="900"
                textAnchor="middle"
                fill="#7C3AED"
              >
                AP
              </text>
              {/* Star Crest */}
              <polygon points="60,60 63,67 71,68 65,74 67,82 60,78 53,82 55,74 49,68 57,67" fill="#FACC15" />
            </>
          ),
        };
      }
      if (selectedValue === 'Drivers exam') {
        return {
          gradId: 'g_driver',
          stops: [
            { offset: '0%', color: '#16A34A' },
            { offset: '100%', color: '#14532D' },
          ],
          accentDot1: '#BBF7D0',
          accentDot2: '#86EFAC',
          content: (
            <>
              {/* Steering Wheel */}
              <circle cx="60" cy="56" r="26" fill="none" stroke="#FFFFFF" strokeWidth="5.5" />
              <circle cx="60" cy="56" r="9" fill="#FACC15" />
              <line x1="34" y1="56" x2="51" y2="56" stroke="#FFFFFF" strokeWidth="4.5" />
              <line x1="69" y1="56" x2="86" y2="56" stroke="#FFFFFF" strokeWidth="4.5" />
              <line x1="60" y1="65" x2="60" y2="82" stroke="#FFFFFF" strokeWidth="4.5" />
            </>
          ),
        };
      }
      if (selectedValue) {
        return {
          gradId: 'g_exam_custom',
          stops: [
            { offset: '0%', color: '#8B5CF6' },
            { offset: '100%', color: '#5B21B6' },
          ],
          accentDot1: '#DDD6FE',
          accentDot2: '#C4B5FD',
          content: (
            <>
              <rect x="34" y="28" width="52" height="64" rx="8" fill="#FFFFFF" />
              <rect x="42" y="22" width="36" height="10" rx="5" fill="#FACC15" />
              <path d="M44 48h22M44 60h26M44 72h16" stroke="#8B5CF6" strokeWidth="4" strokeLinecap="round" />
              <circle cx="76" cy="74" r="8" fill="#10B981" />
              <path d="M72 74 l3 3 6-6" stroke="#fff" strokeWidth="2" strokeLinecap="round" fill="none" />
            </>
          ),
        };
      }
      // Default Exam
      return {
        gradId: 'gp2',
        stops: [
          { offset: '0%', color: '#8677D6' },
          { offset: '100%', color: '#6A5BBE' },
        ],
        accentDot1: '#D9CFF9',
        accentDot2: '#D9CFF9',
        content: (
          <>
            <rect x="50" y="20" width="26" height="13" rx="6.5" fill="#fff" />
            <rect
              x="38"
              y="27"
              width="50"
              height="60"
              rx="9"
              fill="none"
              stroke="#fff"
              strokeWidth="6"
            />
            <path
              d="M48 48h20M48 62h26M48 76h14"
              stroke="#fff"
              strokeWidth="5"
              strokeLinecap="round"
            />
            <path
              d="M76 45l5 5 9-11"
              fill="none"
              stroke="#fff"
              strokeWidth="5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M74 96l17-17 9 9-17 17-12 3Z"
              fill="none"
              stroke="#fff"
              strokeWidth="5"
              strokeLinejoin="round"
            />
          </>
        ),
      };
    }

    // ----------------- QUESTION 5: SOCIAL (type: 'social') -----------------
    if (type === 'social') {
      if (selectedValue === 'TikTok') {
        return {
          gradId: 'g_tiktok',
          stops: [
            { offset: '0%', color: '#000000' },
            { offset: '100%', color: '#1E1B2E' },
          ],
          accentDot1: '#00F2FE',
          accentDot2: '#FE2C55',
          content: (
            <>
              {/* TikTok Music Note with Dual Cyan / Magenta Shadows */}
              <path
                d="M58 72 A12 12 0 1 1 70 60 V34 C76 40 84 44 92 44 V36 C84 36 78 30 78 22 H68 V60 A12 12 0 0 1 58 72 Z"
                fill="#FE2C55"
                transform="translate(2, 2)"
              />
              <path
                d="M58 72 A12 12 0 1 1 70 60 V34 C76 40 84 44 92 44 V36 C84 36 78 30 78 22 H68 V60 A12 12 0 0 1 58 72 Z"
                fill="#00F2FE"
                transform="translate(-2, -2)"
              />
              <path
                d="M58 72 A12 12 0 1 1 70 60 V34 C76 40 84 44 92 44 V36 C84 36 78 30 78 22 H68 V60 A12 12 0 0 1 58 72 Z"
                fill="#FFFFFF"
              />
            </>
          ),
        };
      }
      if (selectedValue === 'YouTube') {
        return {
          gradId: 'g_youtube',
          stops: [
            { offset: '0%', color: '#DC2626' },
            { offset: '100%', color: '#991B1B' },
          ],
          accentDot1: '#FCA5A5',
          accentDot2: '#FECACA',
          content: (
            <>
              {/* YouTube Screen */}
              <rect x="28" y="38" width="64" height="44" rx="14" fill="#FFFFFF" />
              {/* Triangle Play Button */}
              <polygon points="54,50 54,70 72,60" fill="#DC2626" />
            </>
          ),
        };
      }
      if (selectedValue === 'Friend or classmate') {
        return {
          gradId: 'g_friends',
          stops: [
            { offset: '0%', color: '#8B5CF6' },
            { offset: '100%', color: '#6D28D9' },
          ],
          accentDot1: '#DDD6FE',
          accentDot2: '#C4B5FD',
          content: (
            <>
              {/* Two classmates */}
              <circle cx="48" cy="46" r="11" fill="#FFFFFF" />
              <path d="M34 78 C34 66 62 66 62 78" fill="#FFFFFF" opacity="0.9" />
              <circle cx="72" cy="46" r="11" fill="#FACC15" />
              <path d="M58 78 C58 66 86 66 86 78" fill="#FACC15" opacity="0.9" />
              {/* Heart in middle */}
              <path
                d="M60 38 C60 34 56 32 54 34 C52 36 54 40 60 44 C66 40 68 36 66 34 C64 32 60 34 60 38 Z"
                fill="#F43F5E"
              />
            </>
          ),
        };
      }
      if (selectedValue === 'Google Search') {
        return {
          gradId: 'g_google',
          stops: [
            { offset: '0%', color: '#2563EB' },
            { offset: '100%', color: '#1D4ED8' },
          ],
          accentDot1: '#93C5FD',
          accentDot2: '#BFDBFE',
          content: (
            <>
              {/* Magnifying Glass */}
              <circle cx="54" cy="50" r="18" fill="none" stroke="#FFFFFF" strokeWidth="6" />
              <line x1="68" y1="64" x2="86" y2="82" stroke="#FFFFFF" strokeWidth="6" strokeLinecap="round" />
              {/* Colored sparkles */}
              <circle cx="48" cy="46" r="3.5" fill="#EA4335" />
              <circle cx="58" cy="44" r="3" fill="#FBBC05" />
              <circle cx="54" cy="55" r="3.5" fill="#34A853" />
            </>
          ),
        };
      }
      // Default Instagram / Social
      return {
        gradId: 'gi1',
        stops: [
          { offset: '0%', color: '#FED576' },
          { offset: '30%', color: '#F47133' },
          { offset: '55%', color: '#D62976' },
          { offset: '80%', color: '#962FBF' },
          { offset: '100%', color: '#4F5BD5' },
        ],
        accentDot1: '#FFFFFF',
        accentDot2: '#FED576',
        content: (
          <>
            <rect
              x="32"
              y="34"
              width="56"
              height="56"
              rx="16"
              fill="none"
              stroke="#fff"
              strokeWidth="6"
            />
            <circle cx="60" cy="62" r="14" fill="none" stroke="#fff" strokeWidth="6" />
            <circle cx="79" cy="43" r="5" fill="#fff" />
          </>
        ),
      };
    }

    // Fallback for spacer or unhandled
    return {
      gradId: 'g_default',
      stops: [
        { offset: '0%', color: '#4A79BE' },
        { offset: '100%', color: '#2E5590' },
      ],
      accentDot1: '#7FA8DC',
      accentDot2: '#9CC0E8',
      content: null,
    };
  };

  const theme = getTheme();

  return (
    <div className="w-[140px] h-[140px] sm:w-[150px] sm:h-[150px] mx-auto relative flex-none mb-2 transition-transform duration-300 ease-out active:scale-95">
      <svg
        key={selectedValue || type}
        viewBox="0 0 120 120"
        className="w-full h-full drop-shadow-[0_18px_30px_rgba(0,0,0,0.45)] transition-all duration-500 ease-out"
      >
        <defs>
          <linearGradient id={theme.gradId} x1="0" y1="0" x2="1" y2="1">
            {theme.stops.map((s, idx) => (
              <stop key={idx} offset={s.offset} stopColor={s.color} />
            ))}
          </linearGradient>
        </defs>

        {/* The main rect selected by CSS selector: svg > rect:nth-of-type(1) */}
        <rect
          x="10"
          y="12"
          width="100"
          height="88"
          rx="24"
          fill={`url(#${theme.gradId})`}
          className="transition-all duration-500 ease-out"
        />

        {/* Ambient accent dots */}
        <circle cx="26" cy="86" r="4" fill={theme.accentDot1} opacity=".8" />
        <circle cx="94" cy="26" r="5" fill={theme.accentDot2} opacity=".85" />

        {/* Icon Artwork that dynamically updates based on selected option */}
        <g className="transition-all duration-300 ease-out">
          {theme.content}
        </g>
      </svg>

      {/* Subtle depth shadow underneath badge */}
      <div className="absolute left-[14%] right-[14%] -bottom-3.5 h-5 rounded-[50%] bg-[radial-gradient(ellipse,rgba(0,0,0,0.5),transparent_70%)]" />
    </div>
  );
};
