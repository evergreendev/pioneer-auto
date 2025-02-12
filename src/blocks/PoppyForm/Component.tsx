"use client"
const PoppyForm = () => {  
  
  function handleheightChange(e: { data: { type: string; height: string } }) {
    const frame = document.getElementById('poppy-booking-iframe')
    if (!frame) return
    if (e.data.type === 'height_change') {
      frame.style.height = e.data.height + 'px'
    }
    if (e.data.type === 'scroll') {
      frame.scrollIntoView()
    }
  }
  function onLoad() {
    window.addEventListener('message', handleheightChange)
  }
  return <iframe
    id="poppy-booking-iframe"
    src="https://booking.poppy-bridal.com/7952cd68-7d25-437a-a038-6854e3b0fd44"
    onLoad={onLoad}
    style={{
      border: 0,
      height: "600px",
      width: "100%",
    }}
  ></iframe>
}

export default PoppyForm;
