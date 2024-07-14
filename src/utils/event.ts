function on<Payload = any>(
    eventType: string,
    listener: (detail: { detail: Payload }) => void
  ) {
    document.addEventListener(eventType, (detail) => listener(detail as any));
  }
  
  function off(eventType: string, listener = () => null) {
    document.removeEventListener(eventType, listener);
  }
  
  function trigger<Payload = any>(eventType: string, data?: Payload) {
    const event = new CustomEvent(eventType, { detail: data });
    document.dispatchEvent(event);
  }
  export const eventSetup = { on, off, trigger };
  