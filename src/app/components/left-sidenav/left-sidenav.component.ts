import { Component, OnInit } from '@angular/core';
import { CategoryType, ClothesProductType, FootwareProductType, SexType } from 'src/app/shared/enums/user-type.enum';

@Component({
  selector: 'app-left-sidenav',
  templateUrl: './left-sidenav.component.html',
  styleUrls: ['./left-sidenav.component.scss']
})
export class LeftSidenavComponent implements OnInit {

  links = [
    { url: '/history', name: 'Історія замовлень' },
    { name: 'Асортимент', sex: [
      { name: 'Чоловікам', categories: [
        { name: 'Взуття', children: [
          { url: '/categories', params: { sex: SexType.Man, category: CategoryType.Footwear, product: FootwareProductType.Sneakers as any }, name: 'Кросівки' },
          { url: '/categories', params: { sex: SexType.Man, category: CategoryType.Footwear, product: FootwareProductType.Sandals as any }, name: 'Сандалі' },
          { url: '/categories', params: { sex: SexType.Man, category: CategoryType.Footwear, product: FootwareProductType.Shoes as any }, name: 'Черевики' }
        ]},
        { name: 'Одяг', children: [
          { url: '/categories', params: { sex: SexType.Man, category: CategoryType.Clothes, product: ClothesProductType.Windbreakers as any }, name: 'Вітровки' },
          { url: '/categories', params: { sex: SexType.Man, category: CategoryType.Clothes, product: ClothesProductType.Sweaters as any }, name: 'Кофти' },
          { url: '/categories', params: { sex: SexType.Man, category: CategoryType.Clothes, product: ClothesProductType.Jackets as any }, name: 'Куртки' },
          { url: '/categories', params: { sex: SexType.Man, category: CategoryType.Clothes, product: ClothesProductType.Leggings as any }, name: 'Лосини' },
          { url: '/categories', params: { sex: SexType.Man, category: CategoryType.Clothes, product: ClothesProductType.Tshirts as any }, name: 'Футболки' },
          { url: '/categories', params: { sex: SexType.Man, category: CategoryType.Clothes, product: ClothesProductType.Tracksuits as any }, name: 'Спортивні костюми' }
        ]}
      ]},
      { name: 'Жінкам', categories: [
        { name: 'Взуття', children: [
          { url: '/categories', params: { sex: SexType.Woman, category: CategoryType.Footwear, product: FootwareProductType.Sneakers as any }, name: 'Кросівки' },
          { url: '/categories', params: { sex: SexType.Woman, category: CategoryType.Footwear, product: FootwareProductType.Sandals as any }, name: 'Сандалі' },
          { url: '/categories', params: { sex: SexType.Woman, category: CategoryType.Footwear, product: FootwareProductType.Shoes as any }, name: 'Черевики' }
        ]},
        { name: 'Одяг', children: [
          { url: '/categories', params: { sex: SexType.Woman, category: CategoryType.Clothes, product: ClothesProductType.Windbreakers as any }, name: 'Вітровки' },
          { url: '/categories', params: { sex: SexType.Woman, category: CategoryType.Clothes, product: ClothesProductType.Sweaters as any }, name: 'Кофти' },
          { url: '/categories', params: { sex: SexType.Woman, category: CategoryType.Clothes, product: ClothesProductType.Jackets as any }, name: 'Куртки' },
          { url: '/categories', params: { sex: SexType.Woman, category: CategoryType.Clothes, product: ClothesProductType.Leggings as any }, name: 'Лосини' },
          { url: '/categories', params: { sex: SexType.Woman, category: CategoryType.Clothes, product: ClothesProductType.Tshirts as any }, name: 'Футболки' },
          { url: '/categories', params: { sex: SexType.Woman, category: CategoryType.Clothes, product: ClothesProductType.Tracksuits as any }, name: 'Спортивні костюми' }
        ]}
      ]}
    ]},
    { url: '/order', name: 'Створити замовлення' }
  ]

  constructor() { }

  ngOnInit(): void {
  }

}
