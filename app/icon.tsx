import { ImageResponse } from "next/og";

export const size = {
  width: 64,
  height: 64,
};
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background:
            "radial-gradient(circle at 30% 30%, #641D35 0%, #35111F 70%, #1E0710 100%)",
          borderRadius: "16px",
          border: "2px solid rgba(214, 177, 122, 0.75)",
        }}
      >
        <svg
          width="34"
          height="34"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12 20.5C12 20.5 4.5 15.2 4.5 9.5C4.5 6.8 6.6 4.8 9.2 4.8C10.7 4.8 11.5 5.6 12 6.6C12.5 5.6 13.3 4.8 14.8 4.8C17.4 4.8 19.5 6.8 19.5 9.5C19.5 15.2 12 20.5 12 20.5Z"
            fill="#F0C5D1"
            stroke="#D6B17A"
            strokeWidth="1.2"
          />
        </svg>
      </div>
    ),
    {
      ...size,
    }
  );
}
