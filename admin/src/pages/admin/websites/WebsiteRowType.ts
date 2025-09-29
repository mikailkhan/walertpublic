export type WebsiteRows = {
  websites: {
    websiteId: number;
    active: boolean;
    scraperModule: string;
    website: string;
  }[];
};

// "websiteId": 1017,
//         "website": "www.cougar.com.pk",
//         "priceSelector": "#price-template--24432782278972__main > div > div > div.price__sale > span.price-item.price-item--sale.price-item--last",
//         "productNameSelector": "#ProductInfo-template--24432782278972__main > div.product__title > h1",
//         "active": true,
//         "scraperModule": "NormalScraper"
