// export const extractFirstElementText = (htmlContent: string): string => {
//   console.log(htmlContent);
//   const parser = new DOMParser();
//   const doc = parser.parseFromString(htmlContent, "text/html");
//   console.log("doc", doc);
//   const firstElement = doc.body.firstElementChild;

//   return firstElement?.textContent || "Untitled Post";
// };
export const showTitle = (htmlContent: string): string => {
  console.log(htmlContent);
  const parser = new DOMParser();
  const doc = parser.parseFromString(htmlContent, "text/html");
  console.log("doc", doc);

  // Gather text content from the first three child elements
  const firstThreeElements = Array.from(doc.body.children).slice(0, 3);
  const texts = firstThreeElements
    .map((element) => element.textContent?.trim())
    .filter((text) => text);

  return texts.length > 0 ? texts.join(" ") : "Untitled Post";
};
