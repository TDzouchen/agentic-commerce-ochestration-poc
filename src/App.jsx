function App() {
  return (
    <div className="relative w-screen h-screen overflow-hidden">
      {/* Background slot — replace backgroundImage in config */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundColor: '#1a1a1a' }}
      />
      {/* Chat widget will mount here */}
    </div>
  )
}

export default App
