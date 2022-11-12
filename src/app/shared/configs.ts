import { CategoryType, ClothesProductType, FootwareProductType, SexType } from "./enums/user-type.enum"
import { IList, IProductList } from "./interfaces";

export const SexTitle = {
  "man": "Для чоловіків",
  "woman": "Для жінок"
}

export const CategoryTitle = {
  "footwear": "Взуття",
  "clothes": "Одяг",
  "accessories": "Аксесуари"
}

export const ProductTitle = {
  "sneakers": "Кросівки",
  "sandals": "Сандалі",
  "shoes": "Черевики",
  "windbreakers": "Вітровки",
  "sweaters": "Кофти",
  "jackets": "Куртки",
  "leggings": "Лосини",
  "t-shirts": "Футболки",
  "tracksuits": "Спортивні костюми"
}

export const sexList: IList[] = [
  { name: 'Чоловіча', value: SexType.Man },
  { name: 'Жіноча', value: SexType.Woman }
];

export const categoryList: IList[] = [
  { name: 'Взуття', value: CategoryType.Footwear },
  { name: 'Одяг', value: CategoryType.Clothes }
];

export const productList: IProductList = {
  footwear: [
    { name: 'Кросовки', value: FootwareProductType.Sneakers },
    { name: 'Сандалі', value: FootwareProductType.Sandals },
    { name: 'Черевики', value: FootwareProductType.Shoes }
  ],
  clothes: [
    { name: 'Вітровки', value: ClothesProductType.Windbreakers },
    { name: 'Кофти', value: ClothesProductType.Sweaters },
    { name: 'Куртки', value: ClothesProductType.Jackets },
    { name: 'Лосини', value: ClothesProductType.Leggings },
    { name: 'Футболки', value: ClothesProductType.Tshirts },
    { name: 'Спортивні костюми', value: ClothesProductType.Tracksuits }
  ]
}
