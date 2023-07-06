import styled from "styled-components/macro";

const getFontFamily = (variant) => {
  const defaultFonts = {
    primary: "Poppins",
    secondary: "Prompt",
  };
  return defaultFonts[variant] || defaultFonts.primary;
};

const getBreakpoints = (variant) => {
  const defaultVariants = {
    sm: 600,
    md: 768,
    lg: 1024,
    xl: 1280,
    "2xl": 1536,
    "3xl": 1536,
  };
  return defaultVariants[variant];
};

/**
 * @params font - font variants e.g. primary, secondary
 * @params size e.g. { sm : 0.75, md : 1.25 }
 * @params weight - font weight
 */
const Text = styled.p`
  ${({ font, size, weight = "400" }) => {
    let style = `  
      font-family: ${getFontFamily(font)}; 
      font-weight: ${weight};
    `;

    if (size) {
      Object.entries(size).forEach(([screen, value]) => {
        if (screen === "xs") {
          style += `
            font-size: ${value}rem;
          `;
        } else {
          style += `
            @media (min-width: ${getBreakpoints(screen)}px) {
              font-size: ${value}rem;
            }
          `;
        }
      });
    }

    return style;
  }}
`;

export default Text;
