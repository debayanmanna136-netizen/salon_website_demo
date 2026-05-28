export default function LiveBackground() {
  return (
    <div className="fixed inset-0 z-[-1] overflow-hidden bg-white">
      {/* Animated Repeating Pattern Background */}
      <div
        className="absolute inset-0 opacity-15 animate-[bgPan_40s_linear_infinite]"
        style={{
          backgroundImage: `url('/bg-pattern.jpg')`, // The user's uploaded image
          backgroundSize: "300px",
          backgroundRepeat: "repeat",
        }}
      />
      
      {/* Subtle overlay to ensure text remains readable */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-white/40 pointer-events-none"></div>
    </div>
  );
}
