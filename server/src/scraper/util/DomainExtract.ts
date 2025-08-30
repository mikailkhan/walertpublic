export const domainExtract = (url: string) => {
  try {
    const domain = new URL(url).hostname;
    return domain;
  } catch (error) {
    console.log(`Error in converting url to domain.`);
  }
};
