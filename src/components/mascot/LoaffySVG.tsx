"use client";

import { useEffect, useId, useState } from "react";
import { motion } from "motion/react";
import type { Form, LoaffyTrigger, Mood, Pose } from "./LoaffyBus";
import {
  assertLoaffyClearance,
  FORM_SMALL_BEANS,
  LOST_BEANS,
  REST_BEANS,
  type BeanSpec,
} from "./parts/clearance";
import {
  Bean,
  BUBBLE_BODY_PATH,
  Cheeks,
  CUBE_LEFT_PATH,
  CUBE_RIGHT_PATH,
  CUBE_TOP_PATH,
  Eyes,
  GroundShadow,
  HappyBurstLines,
  Highlight,
  JumpMotionLines,
  LandingImpactLines,
  LOAFFY_COLORS,
  LostQuestionMark,
  MidFlipSpinLines,
  Mouth,
  Pad,
  PenShape,
  PLAY_BODY_PATH,
  ShadedShape,
  SleepyZz,
  ThinkingOrbit,
  VibingNotes,
  WinkSparkle,
  type EyeVariant,
  type MouthVariant,
} from "./parts";

export type LoaffySize = 32 | 48 | 64 | 128 | 240 | 320 | 480;

export interface LoaffySVGProps {
  mood?: Mood;
  pose?: Pose;
  form?: Form;
  size?: LoaffySize;
  wobble?: boolean;
  decorative?: boolean;
  label?: string;
  lookOffset?: { x: number; y: number };
  blinking?: boolean;
  activeTrigger?: LoaffyTrigger | null;
  reducedMotion?: boolean;
  showGroundShadow?: boolean;
  onClick?: () => void;
  className?: string;
}

function getBeansForState(
  mood: Mood,
  pose: Pose,
  form: Form
): {
  beans: BeanSpec[];
  shaded: boolean;
  strokeWidth: number;
  show3DHighlight: boolean;
} {
  if (form === "lost") {
    return {
      beans: LOST_BEANS,
      shaded: true,
      strokeWidth: 3.4,
      show3DHighlight: false,
    };
  }

  if (form === "paw-3d") {
    return {
      beans: REST_BEANS,
      shaded: true,
      strokeWidth: 3.4,
      show3DHighlight: true,
    };
  }

  if (
    form === "window" ||
    form === "phone" ||
    form === "cube" ||
    form === "play" ||
    form === "bubble"
  ) {
    return {
      beans: FORM_SMALL_BEANS,
      shaded: false,
      strokeWidth: 3,
      show3DHighlight: false,
    };
  }

  // form === "paw"
  if (pose === "jump") {
    return {
      beans: [
        { id: "ol", cx: 38, cy: 82, rx: 14, ry: 18, rotate: -34 },
        { id: "il", cx: 80, cy: 56, rx: 15, ry: 19, rotate: -12 },
        { id: "ir", cx: 120, cy: 56, rx: 15, ry: 19, rotate: 12 },
        { id: "or", cx: 162, cy: 82, rx: 14, ry: 18, rotate: 34 },
      ],
      shaded: false,
      strokeWidth: 3.4,
      show3DHighlight: false,
    };
  }

  if (pose === "landing") {
    return {
      beans: [
        { id: "ol", cx: 38, cy: 94, rx: 14, ry: 18, rotate: -34 },
        { id: "il", cx: 80, cy: 69, rx: 15, ry: 19, rotate: -12 },
        { id: "ir", cx: 120, cy: 69, rx: 15, ry: 19, rotate: 12 },
        { id: "or", cx: 162, cy: 94, rx: 14, ry: 18, rotate: 34 },
      ],
      shaded: false,
      strokeWidth: 3.4,
      show3DHighlight: false,
    };
  }

  if (pose === "side-eye") {
    return {
      beans: [
        { id: "ol", cx: 38, cy: 82, rx: 14, ry: 18, rotate: -44 },
        { id: "il", cx: 80, cy: 66, rx: 15, ry: 19, rotate: -12 },
        { id: "ir", cx: 120, cy: 66, rx: 15, ry: 19, rotate: 12 },
        { id: "or", cx: 162, cy: 90, rx: 14, ry: 18, rotate: 34 },
      ],
      shaded: false,
      strokeWidth: 3.4,
      show3DHighlight: false,
    };
  }

  if (pose === "vibing") {
    return {
      beans: [
        { id: "ol", cx: 38, cy: 87, rx: 14, ry: 18, rotate: -34 },
        { id: "il", cx: 80, cy: 68, rx: 15, ry: 19, rotate: -12 },
        { id: "ir", cx: 120, cy: 60, rx: 15, ry: 19, rotate: 12 },
        { id: "or", cx: 162, cy: 90, rx: 14, ry: 18, rotate: 34 },
      ],
      shaded: false,
      strokeWidth: 3.4,
      show3DHighlight: false,
    };
  }

  if (pose === "none") {
    if (mood === "happy") {
      return {
        beans: [
          { id: "ol", cx: 38, cy: 80, rx: 14, ry: 18, rotate: -34 },
          { id: "il", cx: 80, cy: 56, rx: 15, ry: 19, rotate: -12 },
          { id: "ir", cx: 120, cy: 56, rx: 15, ry: 19, rotate: 12 },
          { id: "or", cx: 162, cy: 80, rx: 14, ry: 18, rotate: 34 },
        ],
        shaded: false,
        strokeWidth: 3.4,
        show3DHighlight: false,
      };
    }

    if (mood === "sleepy") {
      return {
        beans: [
          { id: "ol", cx: 38, cy: 93, rx: 14, ry: 18, rotate: -34 },
          { id: "il", cx: 80, cy: 69, rx: 15, ry: 19, rotate: -12 },
          { id: "ir", cx: 120, cy: 69, rx: 15, ry: 19, rotate: 12 },
          { id: "or", cx: 162, cy: 93, rx: 14, ry: 18, rotate: 34 },
        ],
        shaded: false,
        strokeWidth: 3.4,
        show3DHighlight: false,
      };
    }

    if (mood === "surprised") {
      return {
        beans: [
          { id: "ol", cx: 31, cy: 84, rx: 14, ry: 18, rotate: -42 },
          { id: "il", cx: 76, cy: 56, rx: 15, ry: 19, rotate: -16 },
          { id: "ir", cx: 124, cy: 56, rx: 15, ry: 19, rotate: 16 },
          { id: "or", cx: 169, cy: 84, rx: 14, ry: 18, rotate: 42 },
        ],
        shaded: false,
        strokeWidth: 3.4,
        show3DHighlight: false,
      };
    }
  }

  return {
    beans: REST_BEANS,
    shaded: false,
    strokeWidth: 3.4,
    show3DHighlight: false,
  };
}

function getGroundShadowSpec(pose: Pose, form: Form) {
  if (form === "window") return { cx: 100, cy: 190, rx: 58, ry: 4.5, opacity: 0.12 };
  if (form === "phone") return { cx: 100, cy: 194, rx: 44, ry: 4.5, opacity: 0.12 };
  if (form === "cube") return { cx: 100, cy: 194, rx: 54, ry: 4.5, opacity: 0.12 };
  if (form === "play") return { cx: 100, cy: 192, rx: 50, ry: 4.5, opacity: 0.12 };
  if (form === "bubble") return { cx: 100, cy: 194, rx: 50, ry: 4.5, opacity: 0.12 };
  if (form === "paw-3d" || form === "lost")
    return { cx: 100, cy: 196, rx: 50, ry: 4.5, opacity: 0.12 };

  if (pose === "loaf") return { cx: 100, cy: 196, rx: 52, ry: 4.5, opacity: 0.12 };
  if (pose === "chill-lean") return { cx: 100, cy: 196, rx: 40, ry: 4.5, opacity: 0.12 };
  if (pose === "jump") return { cx: 100, cy: 196, rx: 26, ry: 3.5, opacity: 0.1 };
  if (pose === "landing") return { cx: 100, cy: 196, rx: 60, ry: 4.5, opacity: 0.12 };
  if (pose === "mid-flip") return { cx: 100, cy: 196, rx: 22, ry: 3, opacity: 0.1 };

  return { cx: 100, cy: 196, rx: 46, ry: 4.5, opacity: 0.12 };
}

function getGroupTransform(mood: Mood, pose: Pose, form: Form): string | undefined {
  if (form !== "paw") return undefined;

  switch (pose) {
    case "loaf":
      return "translate(100 186) scale(1.08 0.92) translate(-100 -182)";
    case "shades":
      return "rotate(-6 100 182)";
    case "chill-lean":
      return "rotate(14 100 182)";
    case "jump":
      return "translate(0 -10) translate(100 182) scale(0.9 1.1) translate(-100 -182)";
    case "landing":
      return "translate(100 186) scale(1.14 0.84) translate(-100 -182)";
    case "vibing":
      return "rotate(-7 100 182)";
    case "mid-flip":
      return "translate(0 -6) rotate(160 100 118)";
    case "none":
    default:
      if (mood === "curious") return "rotate(-8 100 140)";
      if (mood === "surprised")
        return "translate(100 110) scale(1.06) translate(-100 -110)";
      return undefined;
  }
}

function resolveFaceSpec(mood: Mood, pose: Pose, form: Form): {
  eyeVariant: EyeVariant;
  mouthVariant: MouthVariant;
  eyeLeftCx?: number;
  eyeRightCx?: number;
  eyeCy?: number;
  cheeks?: { leftCx: number; rightCx: number; cy: number };
  showHighlight?: boolean;
} {
  if (form === "window") {
    return {
      eyeVariant: "calm",
      eyeLeftCx: 86,
      eyeRightCx: 114,
      eyeCy: 128,
      cheeks: { leftCx: 70, rightCx: 130, cy: 144 },
      mouthVariant: "window",
      showHighlight: false,
    };
  }
  if (form === "phone") {
    return {
      eyeVariant: "calm",
      eyeLeftCx: 88,
      eyeRightCx: 112,
      eyeCy: 118,
      cheeks: { leftCx: 78, rightCx: 122, cy: 134 },
      mouthVariant: "phone",
      showHighlight: false,
    };
  }
  if (form === "cube") {
    return {
      eyeVariant: "cube",
      mouthVariant: "cube",
      showHighlight: false,
    };
  }
  if (form === "play") {
    return {
      eyeVariant: "calm",
      eyeLeftCx: 78,
      eyeRightCx: 98,
      eyeCy: 120,
      mouthVariant: "play",
      showHighlight: false,
    };
  }
  if (form === "bubble") {
    return {
      eyeVariant: "calm",
      eyeLeftCx: 86,
      eyeRightCx: 114,
      eyeCy: 112,
      cheeks: { leftCx: 70, rightCx: 130, cy: 128 },
      mouthVariant: "bubble",
      showHighlight: false,
    };
  }
  if (form === "lost") {
    return {
      eyeVariant: "lost",
      mouthVariant: "o",
      showHighlight: false,
    };
  }

  // paw / paw-3d
  if (pose === "shades") {
    return {
      eyeVariant: "shades",
      mouthVariant: "smirk",
      cheeks: { leftCx: 70, rightCx: 130, cy: 158 },
      showHighlight: true,
    };
  }
  if (pose === "chill-lean") {
    return {
      eyeVariant: "chill-lean",
      mouthVariant: "smirk",
      cheeks: { leftCx: 70, rightCx: 130, cy: 156 },
      showHighlight: true,
    };
  }
  if (pose === "jump") {
    return {
      eyeVariant: "happy",
      mouthVariant: "big",
      cheeks: { leftCx: 70, rightCx: 130, cy: 156 },
      showHighlight: true,
    };
  }
  if (pose === "landing") {
    return {
      eyeVariant: "sleepy",
      mouthVariant: "flat",
      cheeks: { leftCx: 70, rightCx: 130, cy: 156 },
      showHighlight: true,
    };
  }
  if (pose === "wink") {
    return {
      eyeVariant: "wink",
      mouthVariant: "smirk",
      cheeks: { leftCx: 70, rightCx: 130, cy: 156 },
      showHighlight: true,
    };
  }
  if (pose === "side-eye") {
    return {
      eyeVariant: "side-eye",
      mouthVariant: "flat",
      cheeks: { leftCx: 70, rightCx: 130, cy: 156 },
      showHighlight: true,
    };
  }
  if (pose === "vibing") {
    return {
      eyeVariant: "happy",
      mouthVariant: "smile",
      cheeks: { leftCx: 70, rightCx: 130, cy: 156 },
      showHighlight: true,
    };
  }
  if (pose === "mid-flip") {
    return {
      eyeVariant: "surprised",
      mouthVariant: "o",
      cheeks: { leftCx: 70, rightCx: 130, cy: 156 },
      showHighlight: true,
    };
  }
  if (pose === "loaf") {
    return {
      eyeVariant: "calm",
      mouthVariant: "smile",
      cheeks: { leftCx: 70, rightCx: 130, cy: 156 },
      showHighlight: true,
    };
  }

  // pose === "none" -> expression mood
  switch (mood) {
    case "curious":
      return {
        eyeVariant: "curious",
        mouthVariant: "smile",
        cheeks: { leftCx: 70, rightCx: 130, cy: 156 },
        showHighlight: true,
      };
    case "thinking":
      return {
        eyeVariant: "thinking",
        mouthVariant: "flat",
        cheeks: { leftCx: 70, rightCx: 130, cy: 156 },
        showHighlight: true,
      };
    case "happy":
      return {
        eyeVariant: "happy",
        mouthVariant: "big",
        cheeks: { leftCx: 70, rightCx: 130, cy: 156 },
        showHighlight: true,
      };
    case "sleepy":
      return {
        eyeVariant: "sleepy",
        mouthVariant: "flat",
        cheeks: { leftCx: 70, rightCx: 130, cy: 156 },
        showHighlight: true,
      };
    case "surprised":
      return {
        eyeVariant: "surprised",
        mouthVariant: "o",
        cheeks: { leftCx: 70, rightCx: 130, cy: 156 },
        showHighlight: true,
      };
    case "calm":
    default:
      return {
        eyeVariant: "calm",
        mouthVariant: "smile",
        cheeks: { leftCx: 70, rightCx: 130, cy: 156 },
        showHighlight: true,
      };
  }
}

function renderFormBody(form: Form, simplified: boolean) {
  switch (form) {
    case "window":
      return (
        <>
          <ShadedShape
            geometry={{
              kind: "rect",
              x: 32,
              y: 72,
              width: 136,
              height: 100,
              rx: 16,
            }}
          />
          <path d="M34,94 H166" stroke="currentColor" strokeWidth={3.4} />
          <circle cx={46} cy={83} r={3.2} fill={LOAFFY_COLORS.ink} />
          <circle cx={57} cy={83} r={3.2} fill={LOAFFY_COLORS.ink} />
          <circle cx={68} cy={83} r={3.2} fill={LOAFFY_COLORS.ink} />
        </>
      );
    case "phone":
      return (
        <>
          <ShadedShape
            geometry={{
              kind: "rect",
              x: 64,
              y: 62,
              width: 72,
              height: 122,
              rx: 18,
            }}
          />
          <rect
            x={88}
            y={70}
            width={24}
            height={6}
            rx={3}
            fill={LOAFFY_COLORS.ink}
          />
        </>
      );
    case "cube":
      return (
        <>
          <PenShape
            geometry={{ kind: "path", d: CUBE_TOP_PATH }}
            fill={LOAFFY_COLORS.gingerLight}
          />
          <PenShape
            geometry={{ kind: "path", d: CUBE_LEFT_PATH }}
            fill={LOAFFY_COLORS.ginger}
          />
          <PenShape
            geometry={{ kind: "path", d: CUBE_RIGHT_PATH }}
            fill={LOAFFY_COLORS.gingerDeep}
          />
        </>
      );
    case "play":
      return <ShadedShape geometry={{ kind: "path", d: PLAY_BODY_PATH }} />;
    case "bubble":
      return <ShadedShape geometry={{ kind: "path", d: BUBBLE_BODY_PATH }} />;
    case "paw-3d":
      return (
        <>
          <Pad shaded />
          {!simplified && (
            <Highlight
              d="M56,132 Q64,110 88,103"
              strokeWidth={6}
              opacity={0.7}
            />
          )}
        </>
      );
    case "lost":
      return <Pad shaded />;
    case "paw":
    default:
      return (
        <>
          <Pad />
          {!simplified && <Highlight />}
        </>
      );
  }
}

export function LoaffySVG({
  mood = "calm",
  pose = "none",
  form = "paw",
  size = 240,
  wobble = true,
  decorative = false,
  label,
  lookOffset = { x: 0, y: 0 },
  blinking = false,
  activeTrigger = null,
  reducedMotion = false,
  showGroundShadow,
  onClick,
  className,
}: LoaffySVGProps) {
  const rawFilterId = useId().replace(/:/g, "");
  const filterId = `lp-pen-${rawFilterId}`;

  // Morph transition state: swap form at 200ms squash peak (LOAFFY-ANIMATION.md §4.16)
  const [renderedForm, setRenderedForm] = useState<Form>(form);
  const [isMorphing, setIsMorphing] = useState(false);

  useEffect(() => {
    if (form === renderedForm) return;
    if (reducedMotion) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setRenderedForm(form);
      setIsMorphing(false);
      return;
    }

    setIsMorphing(true);
    const swapTimer = setTimeout(() => {
      setRenderedForm(form);
    }, 200);
    const endTimer = setTimeout(() => {
      setIsMorphing(false);
    }, 720);

    return () => {
      clearTimeout(swapTimer);
      clearTimeout(endTimer);
    };
  }, [form, renderedForm, reducedMotion]);

  const simplified = size <= 48;
  const enableWobble = wobble && size >= 48 && !reducedMotion;
  const shouldShowShadow = showGroundShadow ?? size > 128;

  const { beans, shaded, strokeWidth, show3DHighlight } = getBeansForState(
    mood,
    pose,
    renderedForm
  );

  // Dev clearance assertion: no bean ever < 4 units from pad
  if (renderedForm === "paw" || renderedForm === "paw-3d" || renderedForm === "lost") {
    assertLoaffyClearance(
      beans,
      `mood=${mood}, pose=${pose}, form=${renderedForm}`,
      4
    );
  }

  const shadowSpec = getGroundShadowSpec(pose, renderedForm);
  const groupTransform = getGroupTransform(mood, pose, renderedForm);
  const faceSpec = resolveFaceSpec(mood, pose, renderedForm);

  const ariaLabel =
    label ??
    (renderedForm !== "paw"
      ? `Loaffy as ${renderedForm}`
      : pose !== "none"
      ? `Loaffy, ${pose} pose`
      : `Loaffy, ${mood}`);

  // Motion animation values for Body and Beans on the 40ms grid (LOAFFY-ANIMATION.md §4)
  const bodyAnimate = (() => {
    if (reducedMotion) return { scaleX: 1, scaleY: 1, y: 0, rotate: 0 };

    if (isMorphing) {
      return {
        scaleX: [1, 1.04, 1.12, 0.96, 1.02, 1],
        scaleY: [1, 0.96, 0.88, 1.06, 0.99, 1],
        y: [0, 0, 0, -4, 0, 0],
        rotate: 0,
      };
    }

    if (activeTrigger === "tap") {
      // §4.6 hop (560ms): 0, 80, 200, 280, 400, 440, 520, 560
      return {
        scaleX: [1, 1.06, 0.94, 1, 0.96, 1.08, 0.98, 1],
        scaleY: [1, 0.94, 1.08, 1, 1.04, 0.92, 1.02, 1],
        y: [0, 0, -12, -14, -4, 0, 0, 0],
        rotate: 0,
      };
    }

    if (activeTrigger === "jump") {
      // §4.7 jump (720ms)
      return {
        scaleX: [1, 1.06, 0.92, 1, 1.12, 0.98, 1],
        scaleY: [1, 0.94, 1.1, 1, 0.88, 1.02, 1],
        y: [0, 0, -20, -28, 0, 0, 0],
        rotate: 0,
      };
    }

    if (activeTrigger === "land") {
      // §4.8 land (480ms): 0, 200, 320, 480
      return {
        scaleX: [0.96, 1.14, 0.96, 1],
        scaleY: [1.04, 0.84, 1.04, 1],
        y: [-40, 0, -4, 0],
        rotate: 0,
      };
    }

    if (activeTrigger === "flip") {
      // §4.15 flip (720ms)
      return {
        scaleX: [1, 1.08, 0.94, 1, 1.1, 1],
        scaleY: [1, 0.92, 1.06, 1, 0.9, 1],
        y: [0, 0, -24, -32, 0, 0],
        rotate: [0, 0, 180, 360, 360, 360],
      };
    }

    // §4.1 idle_breathe (3200ms loop)
    return {
      scaleX: [1, 1.01, 1],
      scaleY: [1, 0.985, 1],
      y: 0,
      rotate: 0,
    };
  })();

  const bodyTransition = (() => {
    if (reducedMotion) return { duration: 0 };
    if (isMorphing) {
      return {
        duration: 0.72,
        times: [0, 0.111, 0.278, 0.444, 0.667, 1],
        ease: "easeInOut" as const,
      };
    }
    if (activeTrigger === "tap") {
      return {
        duration: 0.56,
        times: [0, 0.143, 0.357, 0.5, 0.714, 0.786, 0.929, 1],
        ease: "easeInOut" as const,
      };
    }
    if (activeTrigger === "jump" || activeTrigger === "flip") {
      return {
        duration: 0.72,
        times: [0, 0.167, 0.333, 0.444, 0.778, 0.889, 1],
        ease: "easeInOut" as const,
      };
    }
    if (activeTrigger === "land") {
      return {
        duration: 0.48,
        times: [0, 0.417, 0.667, 1],
        ease: "easeOut" as const,
      };
    }
    return {
      duration: 3.2,
      repeat: Number.POSITIVE_INFINITY,
      ease: "easeInOut" as const,
    };
  })();

  const renderBeanGroup = (bean: BeanSpec) => {
    const isOuter = bean.id === "ol" || bean.id === "or";
    const lagSec = isOuter ? 0.08 : 0.04;

    const beanY = (() => {
      if (reducedMotion) return 0;
      if (isMorphing) return [0, -6, -3, 2, 0];
      if (activeTrigger === "tap") return [0, 2, -6, -8, 0, 2, 0];
      if (activeTrigger === "jump") return [0, 2, -8, -10, 2, 0];
      if (activeTrigger === "land") return [-24, 2, -2, 0];
      return [0, 1, 0];
    })();

    const beanTransition = (() => {
      if (reducedMotion) return { duration: 0 };
      if (isMorphing) {
        return {
          duration: 0.72,
          delay: lagSec,
          ease: "easeInOut" as const,
        };
      }
      if (activeTrigger === "tap") {
        return {
          duration: 0.56,
          delay: lagSec,
          ease: "easeInOut" as const,
        };
      }
      if (activeTrigger === "jump" || activeTrigger === "flip") {
        return {
          duration: 0.72,
          delay: lagSec,
          ease: "easeInOut" as const,
        };
      }
      if (activeTrigger === "land") {
        return {
          duration: 0.48,
          delay: lagSec,
          ease: "easeOut" as const,
        };
      }
      return {
        duration: 3.2,
        delay: lagSec,
        repeat: Number.POSITIVE_INFINITY,
        ease: "easeInOut" as const,
      };
    })();

    return (
      <motion.g
        key={bean.id}
        style={{
          transformBox: "fill-box",
          transformOrigin: "50% 50%",
        }}
        animate={{ y: beanY }}
        transition={beanTransition}
      >
        <Bean
          bean={bean}
          shaded={shaded}
          strokeWidth={strokeWidth}
          show3DHighlight={show3DHighlight && !simplified}
        />
      </motion.g>
    );
  };

  // In paw-3d and lost forms, reference SVGs place Pad before Beans; in standard paw and other forms, Beans come before Body
  const padFirst = renderedForm === "paw-3d" || renderedForm === "lost";

  const bodyNode = (
    <motion.g
      style={{
        transformBox: "fill-box",
        transformOrigin: "50% 100%",
      }}
      animate={bodyAnimate}
      transition={bodyTransition}
    >
      {renderFormBody(renderedForm, simplified)}
      <Eyes
        variant={
          activeTrigger === "wink"
            ? "wink"
            : activeTrigger === "tap" || activeTrigger === "jump"
            ? "happy"
            : faceSpec.eyeVariant
        }
        leftCx={faceSpec.eyeLeftCx}
        rightCx={faceSpec.eyeRightCx}
        cy={faceSpec.eyeCy}
        lookOffset={lookOffset}
        blinking={blinking}
      />
      {!simplified && faceSpec.cheeks && (
        <Cheeks
          leftCx={faceSpec.cheeks.leftCx}
          rightCx={faceSpec.cheeks.rightCx}
          cy={faceSpec.cheeks.cy}
        />
      )}
      <Mouth
        variant={
          activeTrigger === "wink"
            ? "smirk"
            : activeTrigger === "tap" || activeTrigger === "jump"
            ? "big"
            : faceSpec.mouthVariant
        }
      />
    </motion.g>
  );

  const beansNode = <g>{beans.map((b) => renderBeanGroup(b))}</g>;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 200 200"
      width={size}
      height={size}
      role={decorative ? undefined : "img"}
      aria-label={decorative ? undefined : ariaLabel}
      aria-hidden={decorative ? true : undefined}
      onClick={onClick}
      className={className}
      style={{ color: "var(--lp-outline)" }}
    >
      {enableWobble && (
        <defs>
          <filter id={filterId} x="-5%" y="-5%" width="110%" height="110%">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.035"
              numOctaves={2}
              seed={35}
              result="n"
            />
            <feDisplacementMap
              in="SourceGraphic"
              in2="n"
              scale={2.4}
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>
        </defs>
      )}

      <g filter={enableWobble ? `url(#${filterId})` : undefined}>
        {shouldShowShadow && (
          <GroundShadow
            cx={shadowSpec.cx}
            cy={shadowSpec.cy}
            rx={shadowSpec.rx}
            ry={shadowSpec.ry}
            opacity={shadowSpec.opacity}
          />
        )}

        <g transform={groupTransform}>
          {padFirst ? (
            <>
              {bodyNode}
              {beansNode}
            </>
          ) : (
            <>
              {beansNode}
              {bodyNode}
            </>
          )}

          {renderedForm === "paw" &&
            pose === "none" &&
            (mood === "happy" || activeTrigger === "tap") && (
              <HappyBurstLines />
            )}
          {renderedForm === "paw" &&
            pose === "none" &&
            mood === "thinking" && <ThinkingOrbit />}
          {renderedForm === "paw" &&
            pose === "none" &&
            mood === "sleepy" && <SleepyZz />}
          {renderedForm === "paw" &&
            (pose === "wink" || activeTrigger === "wink") && <WinkSparkle />}
        </g>

        {renderedForm === "paw" && pose === "jump" && <JumpMotionLines />}
        {renderedForm === "paw" && pose === "landing" && <LandingImpactLines />}
        {renderedForm === "paw" && pose === "vibing" && <VibingNotes />}
        {renderedForm === "paw" &&
          (pose === "mid-flip" || activeTrigger === "flip") && (
            <MidFlipSpinLines />
          )}
        {renderedForm === "lost" && <LostQuestionMark />}
      </g>
    </svg>
  );
}
