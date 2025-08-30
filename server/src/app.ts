import express, { Request, Response } from "express";
import { startNormalScraper, startPuppeteerScraper } from "./scraper/main";

export const createApp = () => {
  const app = express();

  app.use(express.json());
  app.use(express.urlencoded());

  app.get("/", async (req: Request, res: Response) => {
    // const url = `https://www.gulahmedshop.com/navy-basic-short-mn-sht-ss23-003-a`;
    // const selector = `#product-price-402781 > span`;

    // const url = `https://www.pakwheels.com/used-cars/suzuki-jimny-2021-for-sale-in-lahore-10233577`;
    // const selector = `#scrollToFixed > div.side-bar > div.well.price-well.pos-rel.mb20 > div > strong`;

    // const url = `https://www.daraz.pk/products/-i267562325-s1482543411.html?c=&channelLpJumpArgs=&clickTrackInfo=query%253Apasta%25252C%25252Bnoodle%25252B%25252Bpizza%25252Btools%253Bnid%253A267562325%253Bsrc%253ALazadaMainSrp%253Brn%253Ad80b835c5f87992d41bbd73f4317f4ac%253Bregion%253Apk%253Bsku%253A267562325_PK%253Bprice%253A198%253Bclient%253Adesktop%253Bsupplier_id%253A6005009094243%253Bbiz_source%253Ahp_categories%253Bslot%253A4%253Butlog_bucket_id%253A470687%253Basc_category_id%253A10000608%253Bitem_id%253A267562325%253Bsku_id%253A1482543411%253Bshop_id%253A298559%253BtemplateInfo%253A-1_A3_C%25231103_L%2523&freeshipping=0&fs_ab=1&fuse_fs=&lang=en&location=Punjab&price=198&priceCompare=skuId%3A1482543411%3Bsource%3Alazada-search-voucher%3Bsn%3Ad80b835c5f87992d41bbd73f4317f4ac%3BoriginPrice%3A19800%3BdisplayPrice%3A19800%3BsinglePromotionId%3A-1%3BsingleToolCode%3AmockedSalePrice%3BvoucherPricePlugin%3A0%3Btimestamp%3A1756555624607&ratingscore=4.375722543352601&request_id=d80b835c5f87992d41bbd73f4317f4ac&review=173&sale=671&search=1&source=search&spm=a2a0e.searchlist.list.4&stock=1`;
    // const selector = `#module_product_price_1 > div > div > span`;

    // const data = await startNormalScraper(url, selector);
    // const data = await startPuppeteerScraper(url, selector);

    return res.json(data);
  });

  return app;
};
