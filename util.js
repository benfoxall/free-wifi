export async function poll(resolver, time = 1000) {
  while (true) {
    await resolver();

    // wait a second!
    await new Promise((re) => setTimeout(re, time));
  }
}

export async function jsonp(url) {
  const key = `$$${crypto.randomUUID()}`.replace(/-/g, "_");

  const promise = new Promise((res) => (globalThis[key] = res));

  const script = document.createElement("script");
  script.src = `${url}?callback=${key}`;
  document.body.appendChild(script);

  return promise.then((value) => {
    script.remove();
    delete globalThis[key];

    return value;
  });
}

export const km = new Intl.NumberFormat("en", {
  style: "unit",
  unit: "kilometer",
});
