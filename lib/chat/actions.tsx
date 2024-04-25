import 'server-only'

import {
  createAI,
  createStreamableUI,
  getMutableAIState,
  getAIState,
  render,
  createStreamableValue
} from 'ai/rsc'
import OpenAI from 'openai'

import {
  spinner,
  BotCard,
  BotMessage,
  SystemMessage,
  Stock,
  Purchase
} from '@/components/stocks'

import { z } from 'zod'
import { EventsSkeleton } from '@/components/stocks/events-skeleton'
import { Events } from '@/components/stocks/events'
import { StocksSkeleton } from '@/components/stocks/stocks-skeleton'
import { Stocks } from '@/components/stocks/stocks'
import { StockSkeleton } from '@/components/stocks/stock-skeleton'
import {
  formatNumber,
  runAsyncFnWithoutBlocking,
  sleep,
  nanoid
} from '@/lib/utils'
import { saveChat } from '@/app/actions'
import { SpinnerMessage, UserMessage } from '@/components/stocks/message'
import { Chat } from '@/lib/types'
import { auth } from '@/auth'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || ''
})

async function confirmPurchase(symbol: string, price: number, amount: number) {
  'use server'

  const aiState = getMutableAIState<typeof AI>()

  const purchasing = createStreamableUI(
    <div className="inline-flex items-start gap-1 md:items-center">
      {spinner}
      <p className="mb-2">
        Purchasing {amount} ${symbol}...
      </p>
    </div>
  )

  const ProductSkeleton = createStreamableUI(
    <div className="flex flex-col items-center gap-2 animate-pulse">
      <div className="w-20 h-20 bg-gray-300 rounded-full" />
      <div className="w-32 h-4 bg-gray-300 rounded-full" />
      <div className="w-32 h-4 bg-gray-300 rounded-full" />
    </div>
  )
  
const products =  [{'_id': '62a5c098766f4ba646a2818b', 'product_id': 'PR5F1E', 'name': 'Pico Blackberry', 'price': 40, 'weight': 125, 'measurement': 'gm', 'category': 'Fruits and Vegetables', 'image': 'https://images.deliveryhero.io/image/darkstores-eg/EGY_6223001530121.JPG', 'stock': 7, '__v': 0}, {'_id': '62a5c098766f4ba646a28193', 'product_id': 'QCJEX2', 'name': 'Hygiene Cherries Spanish', 'price': 169, 'weight': 250, 'measurement': 'gm', 'category': 'Fruits and Vegetables', 'image': 'https://images.deliveryhero.io/image/darkstores-eg/EGY_6001254042444.JPG', 'stock': 21, '__v': 0}, {'_id': '62a5c098766f4ba646a281a9', 'product_id': 'HKBREP', 'name': 'Shahd Chicken Fillet', 'price': 54.95, 'weight': 400, 'measurement': 'gm', 'category': 'Meat Poultry and Seafood', 'image': 'https://images.deliveryhero.io/image/darkstores-eg/EGY_6223002610679.PNG', 'stock': 26, '__v': 0}, {'_id': '62a5c098766f4ba646a281ba', 'product_id': 'FCFVCW', 'name': 'Organic Red Eggs', 'price': 36.95, 'weight': 10, 'measurement': 'pcs', 'category': 'Dairy and Eggs', 'image': 'https://images.deliveryhero.io/image/product-information-management/6208e60684add388a1ebef7e.jpg', 'stock': 4, '__v': 0}, {'_id': '62a5c098766f4ba646a281c0', 'product_id': 'T3Z2D6', 'name': 'Activia Rayeb Light 220G', 'price': 7, 'weight': 220, 'measurement': 'g', 'category': 'Dairy and Eggs', 'image': 'https://images.deliveryhero.io/image/nv-eg/Assortment%20/6223002388271.jpeg', 'stock': 38, '__v': 0}, {'_id': '62a5c098766f4ba646a281c1', 'product_id': 'W41E3S', 'name': 'Reefy  Pasteurized Natural Rayeb Full Cream', 'price': 21.5, 'weight': 850, 'measurement': 'ml', 'category': 'Dairy and Eggs', 'image': 'https://images.deliveryhero.io/image/darkstores-eg/EGY_6224011536196.JPG', 'stock': 43, '__v': 0}, {'_id': '62a5c098766f4ba646a281ca', 'product_id': 'G8EQ79', 'name': 'Juhayna Greek Yoghurt Drink Mixed Berries W/Oats', 'price': 18, 'weight': 250, 'measurement': 'gm', 'category': 'Dairy and Eggs', 'image': 'https://images.deliveryhero.io/image/darkstores-eg/EGY_6222014300196.JPG', 'stock': 32, '__v': 0}, {'_id': '62a5c098766f4ba646a281fe', 'product_id': 'A70LXI', 'name': 'Red Bull Energy Drink Sugar Free 250 Ml x', 'price': 90, 'weight': 4, 'measurement': 'pcs', 'category': 'Beverages', 'image': 'https://images.deliveryhero.io/image/product-information-management/61819ebc1b7474d5ab04231e.jpeg', 'stock': 46, '__v': 0}, {'_id': '62a5c098766f4ba646a28203', 'product_id': 'QS1FKO', 'name': 'Mr. Brown Natural Iced Coffee', 'price': 28.5, 'weight': 240, 'measurement': 'ml', 'category': 'Beverages', 'image': 'https://images.deliveryhero.io/image/darkstores-QAtar/Products/QR_901923.jpeg', 'stock': 16, '__v': 0}, {'_id': '62a5c098766f4ba646a2820b', 'product_id': 'RBWJV0', 'name': 'Pepsi', 'price': 5.25, 'weight': 400, 'measurement': 'ml', 'category': 'Beverages', 'image': 'https://images.deliveryhero.io/image/darkstores-eg/EGY_6223001361817.JPG', 'stock': 8, '__v': 0}, {'_id': '62a5c098766f4ba646a2824d', 'product_id': 'RIFD4L', 'name': 'Hero Blueberry Jam', 'price': 59.25, 'weight': 350, 'measurement': 'gm', 'category': 'Breakfast', 'image': 'https://images.deliveryhero.io/image/darkstores-jo/Jordan%20Items/JOR-6221024270352.JPG', 'stock': 42, '__v': 0}, {'_id': '62a5c098766f4ba646a2817e', 'product_id': 'JUAG3R', 'name': 'Pico Avocado', 'price': 65, 'weight': 1, 'measurement': 'kg', 'category': 'Fruits and Vegetables', 'image': 'https://images.deliveryhero.io/image/darkstores-eg/EGY_6223001530640.JPG', 'stock': 28, '__v': 0}, {'_id': '62a5c098766f4ba646a28194', 'product_id': 'D3FJE2', 'name': 'Hygiene Baby Spinach Italian', 'price': 65, 'weight': 125, 'measurement': 'gm', 'category': 'Fruits and Vegetables', 'image': 'https://images.deliveryhero.io/image/product-information-management/621638623087c103f9054ae8.jpg', 'stock': 43, '__v': 0}, {'_id': '62a5c098766f4ba646a281ae', 'product_id': 'JBOTLO', 'name': 'Koki Whole Chicken 1000 -', 'price': 74.95, 'weight': 1100, 'measurement': 'gm', 'category': 'Meat Poultry and Seafood', 'image': 'https://images.deliveryhero.io/image/darkstores-eg/EGY_6223000041086.JPG', 'stock': 24, '__v': 0}, {'_id': '62a5c098766f4ba646a281ce', 'product_id': 'Y54AX4', 'name': 'Hipro Protein Drink Vanilla', 'price': 21.25, 'weight': 260, 'measurement': 'gm', 'category': 'Dairy and Eggs', 'image': 'https://images.deliveryhero.io/image/product-information-management/621baf4529d6f4480ed464c4.webp', 'stock': 40, '__v': 0}, {'_id': '62a5c098766f4ba646a281d1', 'product_id': 'DRYC9Q', 'name': 'Reefy Natural Full Cream Yogurt', 'price': 6, 'weight': 170, 'measurement': 'gm', 'category': 'Dairy and Eggs', 'image': 'https://images.deliveryhero.io/image/darkstores-eg/EGY_764460288902.JPG', 'stock': 25, '__v': 0}, {'_id': '62a5c098766f4ba646a281e0', 'product_id': 'S5RYFP', 'name': 'Juhayna Pure Juice Pineapple', 'price': 23.45, 'weight': 1, 'measurement': 'l', 'category': 'Beverages', 'image': 'https://images.deliveryhero.io/image/darkstores-eg/EGY_6222014335594.JPG', 'stock': 19, '__v': 0}, {'_id': '62a5c098766f4ba646a281e1', 'product_id': 'ADE4HX', 'name': 'Juhayna Pure Juice Apple', 'price': 23.45, 'weight': 1, 'measurement': 'l', 'category': 'Beverages', 'image': 'https://images.deliveryhero.io/image/product-information-management/624975e43326f7f331b40023.jpg', 'stock': 21, '__v': 0}, {'_id': '62a5c098766f4ba646a281ec', 'product_id': 'WMPW6Z', 'name': 'Lamar Pomegranate Juice 100%', 'price': 23.95, 'weight': 1, 'measurement': 'l', 'category': 'Beverages', 'image': 'https://images.deliveryhero.io/image/darkstores-eg/EGY_6224001105517.JPG', 'stock': 22, '__v': 0}, {'_id': '62a5c098766f4ba646a281f8', 'product_id': 'ZPEGQY', 'name': 'Red Bull Energy Drink', 'price': 24.95, 'weight': 250, 'measurement': 'ml', 'category': 'Beverages', 'image': 'https://images.deliveryhero.io/image/product-information-management/61819ff1164d2157176af136.jpg', 'stock': 11, '__v': 0}, {'_id': '62a5c098766f4ba646a28207', 'product_id': 'MKXWOX', 'name': 'Pepsi ', 'price': 14.5, 'weight': 2, 'measurement': 'l', 'category': 'Beverages', 'image': 'https://images.deliveryhero.io/image/darkstores-eg/EGY_6223001360124.JPG', 'stock': 20, '__v': 0}, {'_id': '62a5c098766f4ba646a28208', 'product_id': 'L4VL2Y', 'name': 'Pepsi', 'price': 5.95, 'weight': 330, 'measurement': 'ml', 'category': 'Beverages', 'image': 'https://images.deliveryhero.io/image/product-information-management/612b8dcba27af950209c6682.jpg', 'stock': 39, '__v': 0}, {'_id': '62a5c098766f4ba646a2820d', 'product_id': 'ONKS6T', 'name': 'Pepsi', 'price': 4.95, 'weight': 250, 'measurement': 'ml', 'category': 'Beverages', 'image': 'https://images.deliveryhero.io/image/darkstores-eg/EGY_6223001361725.JPG', 'stock': 22, '__v': 0}, {'_id': '62a5c098766f4ba646a28211', 'product_id': 'CQHUOV', 'name': 'Schweppes Pomegranate', 'price': 5.95, 'weight': 250, 'measurement': 'ml', 'category': 'Beverages', 'image': 'https://images.deliveryhero.io/image/product-information-management/61c7309a72becae96fa6314e.jpg', 'stock': 10, '__v': 0}, {'_id': '62a5c098766f4ba646a28218', 'product_id': 'WIUW1P', 'name': 'Mirinda Orange', 'price': 14.5, 'weight': 2, 'measurement': 'l', 'category': 'Beverages', 'image': 'https://images.deliveryhero.io/image/darkstores-eg/EGY_6223001360568.JPG', 'stock': 21, '__v': 0}, {'_id': '62a5c098766f4ba646a2821a', 'product_id': 'X93UH7', 'name': '7up Free', 'price': 10.75, 'weight': 1, 'measurement': 'l', 'category': 'Beverages', 'image': 'https://images.deliveryhero.io/image/darkstores-eg/EGY_6223001360599.JPG', 'stock': 49, '__v': 0}, {'_id': '62a5c098766f4ba646a28232', 'product_id': 'CMIFG0', 'name': "Temmy's Sweet Flakes", 'price': 36, 'weight': 250, 'measurement': 'gm', 'category': 'Breakfast', 'image': 'https://images.deliveryhero.io/image/product-information-management/617ea8c51876ab8e29f54dfe.jpg', 'stock': 11, '__v': 0}, {'_id': '62a5c098766f4ba646a28233', 'product_id': 'ZA9G85', 'name': 'Temmy’s Choco Pops', 'price': 52.95, 'weight': 375, 'measurement': 'gm', 'category': 'Breakfast', 'image': 'https://images.deliveryhero.io/image/darkstores-eg/EGY_6221012000817.JPG', 'stock': 26, '__v': 0}, {'_id': '62a5c098766f4ba646a2823e', 'product_id': 'H73HDY', 'name': 'Vitrac Strawberry Jam', 'price': 23.75, 'weight': 430, 'measurement': 'g', 'category': 'Breakfast', 'image': 'https://images.deliveryhero.io/image/darkstores-eg/EGY_6221024030017.PNG', 'stock': 48, '__v': 0}, {'_id': '62a5c098766f4ba646a28245', 'product_id': 'L1AWUK', 'name': 'Vitrac  Black Cherry Jam', 'price': 30.25, 'weight': 430, 'measurement': 'gm', 'category': 'Breakfast', 'image': 'https://images.deliveryhero.io/image/darkstores-eg/EGY_6221024992766.PNG', 'stock': 24, '__v': 0}, {'_id': '62a5c098766f4ba646a28254', 'product_id': '65A6FT', 'name': 'Imtenan Nawara Clover Honey', 'price': 114.95, 'weight': 800, 'measurement': 'gm', 'category': 'Breakfast', 'image': 'https://images.deliveryhero.io/image/darkstores-eg/EGY_6221078011413.JPG', 'stock': 14, '__v': 0}, {'_id': '62a5c098766f4ba646a28262', 'product_id': 'MBUF6B', 'name': 'El Bawadi Molasses', 'price': 27.95, 'weight': 700, 'measurement': 'gm', 'category': 'Breakfast', 'image': 'https://images.deliveryhero.io/image/darkstores-eg/EGY_6223000762042.JPG', 'stock': 23, '__v': 0}, {'_id': '62a5c098766f4ba646a28288', 'product_id': 'MJSGBY', 'name': 'Cheetos Puffs Flaming Hot ', 'price': 5, 'weight': 81, 'measurement': 'gm', 'category': 'Chips and Crackers', 'image': 'https://images.deliveryhero.io/image/darkstores-eg/EGY_6221031491863.JPG', 'stock': 18, '__v': 0}, {'_id': '62a5c098766f4ba646a2828c', 'product_id': 'I6I0R5', 'name': 'Halo Protein Puffs Parmesan Cheese ', 'price': 9.95, 'weight': 40, 'measurement': 'gm', 'category': 'Chips and Crackers', 'image': 'https://images.deliveryhero.io/image/darkstores-eg/EGY_6224010447080.JPG', 'stock': 21, '__v': 0}, {'_id': '62a5c098766f4ba646a282a4', 'product_id': '9SOJ02', 'name': 'Cadbury Dairy Milk Fruit Nut', 'price': 12, 'weight': 37, 'measurement': 'g', 'category': 'Chocolate and Candy', 'image': 'https://images.deliveryhero.io/image/product-information-management/61f04bc3cd27c598ea4a8ff0.jpg', 'stock': 44, '__v': 0}, {'_id': '62a5c098766f4ba646a28259', 'product_id': '1ELRTJ', 'name': 'Imtenan Medicinal Honey', 'price': 67.95, 'weight': 450, 'measurement': 'gm', 'category': 'Breakfast', 'image': 'https://images.deliveryhero.io/image/darkstores-eg/EGY_6221078769758.JPG', 'stock': 0, '__v': 0}, {'_id': '62a5c098766f4ba646a2825c', 'product_id': 'BRECA1', 'name': 'Imtenan Spring Flowers Honey', 'price': 66.95, 'weight': 450, 'measurement': 'gm', 'category': 'Breakfast', 'image': 'https://images.deliveryhero.io/image/darkstores-eg/EGY_6221078111274.JPG', 'stock': 17, '__v': 0}, {'_id': '62a5c098766f4ba646a2826a', 'product_id': 'E6I851', 'name': 'Paradise Basbousa With Eshta Flavored Ice Cream', 'price': 100, 'weight': 800, 'measurement': 'ml', 'category': 'Ice Cream', 'image': 'https://images.deliveryhero.io/image/darkstores-eg/EGY_6222020804152.JPG', 'stock': 41, '__v': 0}, {'_id': '62a5c098766f4ba646a2826c', 'product_id': 'UY31YR', 'name': 'Paradise Sandwich cinamon & buscuits Ice Cream  ', 'price': 10, 'weight': 95, 'measurement': 'ml', 'category': 'Ice Cream', 'image': 'https://images.deliveryhero.io/image/product-information-management/62149da0812a30ac5d13ebbb.jpg', 'stock': 3, '__v': 0}, {'_id': '62a5c098766f4ba646a28291', 'product_id': '2GATWN', 'name': 'Top Of The Pop Extra Butter Popcorn', 'price': 18.5, 'weight': 100, 'measurement': 'gm', 'category': 'Chips and Crackers', 'image': 'https://images.deliveryhero.io/image/darkstores-eg/EGY_3800203050270.JPG', 'stock': 46, '__v': 0}, {'_id': '62a5c098766f4ba646a2829c', 'product_id': '9ZPQU4', 'name': 'Kitkat Chunky Chocolate', 'price': 12, 'weight': 40, 'measurement': 'g', 'category': 'Chocolate and Candy', 'image': 'https://images.deliveryhero.io/image/talabat-nv/Kuwait/6294003582678.jpg', 'stock': 24, '__v': 0}, {'_id': '62a5c098766f4ba646a282a9', 'product_id': 'ZILTBI', 'name': 'Galaxy Milk ', 'price': 18, 'weight': 56, 'measurement': 'gm', 'category': 'Chocolate and Candy', 'image': 'https://images.deliveryhero.io/image/darkstores-eg/EGY_6221134005394.JPG', 'stock': 20, '__v': 0}, {'_id': '62a5c098766f4ba646a282b3', 'product_id': 'EDB0YK', 'name': 'Galaxy Chocolate & Coconut Mini', 'price': 65, 'weight': 162.5, 'measurement': 'g', 'category': 'Chocolate and Candy', 'image': 'https://images.deliveryhero.io/image/product-information-management/6228a332fa8191b3011ae5bc.jpg', 'stock': 19, '__v': 0}, {'_id': '62a5c098766f4ba646a282b7', 'product_id': '7WB6J4', 'name': 'Bounty Miniatures Chocolate', 'price': 60, 'weight': 150, 'measurement': 'g', 'category': 'Chocolate and Candy', 'image': 'https://images.deliveryhero.io/image/darkstores/groceries-catalog/products-uae/UAE_4011100023925.jpg', 'stock': 27, '__v': 0}, {'_id': '62a5c098766f4ba646a2816e', 'product_id': '2D4LCV', 'name': 'Varny Golden Onion Net', 'price': 16, 'weight': 2, 'measurement': 'kg', 'category': 'Fruits and Vegetables', 'image': 'https://images.deliveryhero.io/image/darkstores-eg/EGY_6225000442399.JPG', 'stock': 0, '__v': 0}, {'_id': '62a5c098766f4ba646a28174', 'product_id': '69RACK', 'name': 'MAFA Carrot', 'price': 11, 'weight': 1, 'measurement': 'kg', 'category': 'Fruits and Vegetables', 'image': 'https://images.deliveryhero.io/image/product-information-management/61e5681da3a3c9c03011e3e5.jpg', 'stock': 0, '__v': 0}, {'_id': '62a5c098766f4ba646a28187', 'product_id': 'M1YOUO', 'name': 'Fresh Source Kiwi', 'price': 35, 'weight': 0.5, 'measurement': 'kg', 'category': 'Fruits and Vegetables', 'image': 'https://images.deliveryhero.io/image/darkstores-eg/EGY_6224010502222.JPG', 'stock': 41, '__v': 0}, {'_id': '62a5c098766f4ba646a28188', 'product_id': 'WCWWG7', 'name': 'Fresh Source Italian Yellow Apple', 'price': 55, 'weight': 1, 'measurement': 'kg', 'category': 'Fruits and Vegetables', 'image': 'https://images.deliveryhero.io/image/darkstores-eg/EGY_6224010502154.JPG', 'stock': 29, '__v': 0}, {'_id': '62a5c098766f4ba646a281b5', 'product_id': 'MDP5YH', 'name': 'El-Masrya Large Shrimps ', 'price': 425, 'weight': 2, 'measurement': 'kg', 'category': 'Meat Poultry and Seafood', 'image': 'https://images.deliveryhero.io/image/darkstores-eg/EGY_6224008296669.JPG', 'stock': 16, '__v': 0}, {'_id': '62a5c098766f4ba646a281bf', 'product_id': '2QSE4D', 'name': 'Dina Farms Rayeb Light Milk', 'price': 19.5, 'weight': 0.85, 'measurement': 'l', 'category': 'Dairy and Eggs', 'image': 'https://images.deliveryhero.io/image/darkstores-eg/EGY_6224000432300.JPG', 'stock': 27, '__v': 0}, {'_id': '62a5c098766f4ba646a281d0', 'product_id': '1RKIBH', 'name': 'Danone Max Yoghurt Drink Peach', 'price': 12, 'weight': 400, 'measurement': 'gm', 'category': 'Dairy and Eggs', 'image': "https://images.deliveryhero.io/image/talabat-nv/Netscribe%20Images(don't%20touch)/Front%20Images/6223002384211.jpg", 'stock': 45, '__v': 0}, {'_id': '62a5c098766f4ba646a281ed', 'product_id': 'I4EXVB', 'name': 'Lamar Red Grape Juice 100%', 'price': 23.95, 'weight': 1, 'measurement': 'l', 'category': 'Beverages', 'image': 'https://images.deliveryhero.io/image/darkstores-eg/EGY_6224001105487.JPG', 'stock': 13, '__v': 0}, {'_id': '62a5c098766f4ba646a281f7', 'product_id': '341OXP', 'name': 'Dili Natural Pomegranate Juice', 'price': 15.95, 'weight': 290, 'measurement': 'ml', 'category': 'Beverages', 'image': 'https://images.deliveryhero.io/image/darkstores-eg/EGY_6224000060190.PNG', 'stock': 30, '__v': 0}, {'_id': '62a5c098766f4ba646a28200', 'product_id': '49WVZM', 'name': 'Sting Can ', 'price': 4.95, 'weight': 250, 'measurement': 'ml', 'category': 'Beverages', 'image': 'https://images.deliveryhero.io/image/product-information-management/6224ac5d1516df58269ac8f5.jpg', 'stock': 9, '__v': 0}, {'_id': '62a5c098766f4ba646a2821e', 'product_id': '640G6V', 'name': "Temmy's Choco Pillow", 'price': 46.95, 'weight': 375, 'measurement': 'gm', 'category': 'Breakfast', 'image': 'https://images.deliveryhero.io/image/darkstores-eg/EGY_6221012370255.JPG', 'stock': 48, '__v': 0}, {'_id': '62a5c098766f4ba646a28224', 'product_id': '0BW4VG', 'name': "Temmy's Choco Pillow", 'price': 19, 'weight': 120, 'measurement': 'gm', 'category': 'Breakfast', 'image': 'https://images.deliveryhero.io/image/darkstores-eg/EGY_622101200077.JPG', 'stock': 16, '__v': 0}, {'_id': '62a5c098766f4ba646a28229', 'product_id': 'YG07B3', 'name': "Temmy's Choco Pops", 'price': 38.95, 'weight': 250, 'measurement': 'gm', 'category': 'Breakfast', 'image': 'https://images.deliveryhero.io/image/darkstores-eg/EGY_6221012251073.JPG', 'stock': 24, '__v': 0}, {'_id': '62a5c098766f4ba646a28246', 'product_id': '6ASC70', 'name': 'Vitrac Light Apricot Jam', 'price': 21.5, 'weight': 220, 'measurement': 'gm', 'category': 'Breakfast', 'image': 'https://images.deliveryhero.io/image/darkstores-eg/EGY_6221024220029.JPG', 'stock': 29, '__v': 0}, {'_id': '62a5c098766f4ba646a28263', 'product_id': '19235Q', 'name': 'Hero Clover Honey Squeeze -', 'price': 78.25, 'weight': 500, 'measurement': 'gm', 'category': 'Breakfast', 'image': 'https://images.deliveryhero.io/image/product-information-management/6204fa46a0857396d3e82335.jpg', 'stock': 0, '__v': 0}, {'_id': '62a5c098766f4ba646a28278', 'product_id': 'QURCD6', 'name': 'Lion Spicy Cheese', 'price': 5, 'weight': 74, 'measurement': 'gm', 'category': 'Chips and Crackers', 'image': 'https://images.deliveryhero.io/image/product-information-management/6231e3583c97cc70b39b02f4.jpg', 'stock': 24, '__v': 0}, {'_id': '62a5c098766f4ba646a2828a', 'product_id': 'YCHDST', 'name': 'Rusky Toast Mexican ', 'price': 2, 'weight': 33, 'measurement': 'gm', 'category': 'Chips and Crackers', 'image': 'https://images.deliveryhero.io/image/product-information-management/628f8e1fae122e1303028b76.JPG', 'stock': 49, '__v': 0}, {'_id': '62a5c098766f4ba646a281c8', 'product_id': 'WA0NM2', 'name': 'Juhayna Greek Yoghurt Drink Pineapple Peach', 'price': 18, 'weight': 250, 'measurement': 'gm', 'category': 'Dairy and Eggs', 'image': 'https://images.deliveryhero.io/image/darkstores-eg/EGY_6222014300219.JPG', 'stock': 20, '__v': 0}, {'_id': '62a5c098766f4ba646a281dc', 'product_id': 'MSNK5D', 'name': 'Dina Farms Chocolate Milk', 'price': 8.5, 'weight': 250, 'measurement': 'ml', 'category': 'Dairy and Eggs', 'image': 'https://images.deliveryhero.io/image/darkstores-eg/EGY_6224000432195.JPG', 'stock': 29, '__v': 0}, {'_id': '62a5c098766f4ba646a281ea', 'product_id': 'OCE3HO', 'name': 'Lamar Apple Juice 100%', 'price': 23.95, 'weight': 1, 'measurement': 'l', 'category': 'Beverages', 'image': 'https://images.deliveryhero.io/image/darkstores-eg/EGY_6224001105098.JPG', 'stock': 14, '__v': 0}, {'_id': '62a5c098766f4ba646a281fc', 'product_id': '633QRG', 'name': 'Red Bull Energy Drink  Cactus', 'price': 24.95, 'weight': 250, 'measurement': 'ml', 'category': 'Beverages', 'image': 'https://images.deliveryhero.io/image/darkstores-eg/EGY_90453281.JPG', 'stock': 9, '__v': 0}, {'_id': '62a5c098766f4ba646a28201', 'product_id': 'XXSWC7', 'name': 'Mr. Brown Cappuccino Iced Coffee', 'price': 28.5, 'weight': 240, 'measurement': 'ml', 'category': 'Beverages', 'image': 'https://images.deliveryhero.io/image/darkstores-QAtar/Products/QR_901925.jpg', 'stock': 14, '__v': 0}, {'_id': '62a5c098766f4ba646a28205', 'product_id': 'MG634V', 'name': 'Mr.Brown Iced Ethiopia Coffee', 'price': 31.5, 'weight': 240, 'measurement': 'ml', 'category': 'Beverages', 'image': 'https://images.deliveryhero.io/image/darkstores-eg/EGY_4710085232451.JPG', 'stock': 27, '__v': 0}, {'_id': '62a5c098766f4ba646a2821b', 'product_id': 'T0XYSB', 'name': 'Mirinda Orange ', 'price': 5.25, 'weight': 400, 'measurement': 'ml', 'category': 'Beverages', 'image': 'https://images.deliveryhero.io/image/darkstores-eg/EGY_6223001361855.JPG', 'stock': 36, '__v': 0}, {'_id': '62a5c098766f4ba646a2825d', 'product_id': 'R2E8SO', 'name': 'Imtenan Black Seed Honey', 'price': 73.95, 'weight': 450, 'measurement': 'gm', 'category': 'Breakfast', 'image': 'https://images.deliveryhero.io/image/darkstores-eg/EGY_6221078091279.JPG', 'stock': 20, '__v': 0}, {'_id': '62a5c098766f4ba646a28268', 'product_id': 'R4GLWL', 'name': 'Paradise Brownies Ice Cream ', 'price': 80, 'weight': 850, 'measurement': 'ml', 'category': 'Ice Cream', 'image': 'https://images.deliveryhero.io/image/product-information-management/621360e87662d0ec6c36101d.jpg', 'stock': 22, '__v': 0}, {'_id': '62a5c098766f4ba646a28276', 'product_id': 'W6PYGH', 'name': 'Tiger Super - Chilli & Lemon', 'price': 5, 'weight': 74, 'measurement': 'gm', 'category': 'Chips and Crackers', 'image': 'https://images.deliveryhero.io/image/talabat-nv/Kuwait/FiveZero/6223000508619.jpg', 'stock': 25, '__v': 0}, {'_id': '62a5c098766f4ba646a28279', 'product_id': '4522FS', 'name': 'Big Chips Super - Tomato', 'price': 5, 'weight': 74, 'measurement': 'gm', 'category': 'Chips and Crackers', 'image': 'https://images.deliveryhero.io/image/nv-eg/Assortment%20/6223000504352.jpeg', 'stock': 39, '__v': 0}, {'_id': '62a5c098766f4ba646a28284', 'product_id': 'PTJLC8', 'name': 'Lion Chili & Lemon', 'price': 3, 'weight': 42, 'measurement': 'gm', 'category': 'Chips and Crackers', 'image': 'https://images.deliveryhero.io/image/product-information-management/6231e0765f285ac030364ff8.jpg', 'stock': 40, '__v': 0}, {'_id': '62a5c098766f4ba646a28287', 'product_id': '08GJZR', 'name': 'Windows Cheese', 'price': 5, 'weight': 93, 'measurement': 'gm', 'category': 'Chips and Crackers', 'image': 'https://images.deliveryhero.io/image/darkstores-eg/EGY_6223000411001.JPG', 'stock': 37, '__v': 0}, {'_id': '62a5c098766f4ba646a28298', 'product_id': 'H7X5WZ', 'name': 'Kitkat Chunky Cinnabon', 'price': 12, 'weight': 41.5, 'measurement': 'gm', 'category': 'Chocolate and Candy', 'image': 'https://images.deliveryhero.io/image/darkstores-eg/EGY_6294017105184.JPG', 'stock': 6, '__v': 0}, {'_id': '62a5c098766f4ba646a282b1', 'product_id': 'BYR1ZD', 'name': 'KitKat Mini Moments Cinnabon Chocolate Bar', 'price': 75, 'weight': 119, 'measurement': 'g', 'category': 'Chocolate and Candy', 'image': 'https://images.deliveryhero.io/image/darkstores-eg/EGY_6294017104927.JPG', 'stock': 43, '__v': 0}, {'_id': '62a5c098766f4ba646a28176', 'product_id': 'P4YFHI', 'name': 'MAFA Potatoes', 'price': 10, 'weight': 1, 'measurement': 'kg', 'category': 'Fruits and Vegetables', 'image': 'https://images.deliveryhero.io/image/product-information-management/61e568c589fe45b497423e9e.jpg', 'stock': 8, '__v': 0}, {'_id': '62a5c098766f4ba646a2817a', 'product_id': 'MJ9SP0', 'name': 'MAFA Golden Onion', 'price': 8, 'weight': 1, 'measurement': 'kg', 'category': 'Fruits and Vegetables', 'image': 'https://images.deliveryhero.io/image/product-information-management/61e5697bdc519529ba23c132.jpg', 'stock': 26, '__v': 0}, {'_id': '62a5c098766f4ba646a28185', 'product_id': '6I5PVN', 'name': 'Fresh Source Cantaloupe', 'price': 30, 'weight': 2, 'measurement': 'kg', 'category': 'Fruits and Vegetables', 'image': 'https://images.deliveryhero.io/image/darkstores-eg/EGY_6224010502482.JPG', 'stock': 23, '__v': 0}, {'_id': '62a5c098766f4ba646a2818f', 'product_id': '48S2OU', 'name': 'Sharbatly Italian Green Apple', 'price': 95, 'weight': 1, 'measurement': 'kg', 'category': 'Fruits and Vegetables', 'image': 'https://images.deliveryhero.io/image/darkstores-eg/EGY_6225920009528.JPG', 'stock': 18, '__v': 0}, {'_id': '62a5c098766f4ba646a281b3', 'product_id': 'C6X9X1', 'name': 'El-Masrya Large Clean Shrimps', 'price': 199, 'weight': 1, 'measurement': 'kg', 'category': 'Meat Poultry and Seafood', 'image': 'https://images.deliveryhero.io/image/darkstores-eg/EGY_6291106763812.JPG', 'stock': 0, '__v': 0}, {'_id': '62a5c098766f4ba646a281b9', 'product_id': 'NA8H1J', 'name': 'Organic White Eggs', 'price': 41.95, 'weight': 15, 'measurement': 'pcs', 'category': 'Dairy and Eggs', 'image': 'https://images.deliveryhero.io/image/product-information-management/6208e6ac0da0b7dd153ba66e.jpg', 'stock': 6, '__v': 0}, {'_id': '62a5c098766f4ba646a281bd', 'product_id': '09DUW1', 'name': 'Dina Farms Rayeb Milk', 'price': 19.5, 'weight': 0.85, 'measurement': 'l', 'category': 'Dairy and Eggs', 'image': 'https://images.deliveryhero.io/image/darkstores-eg/EGY_6224000432027.JPG', 'stock': 40, '__v': 0}, {'_id': '62a5c098766f4ba646a281be', 'product_id': 'KOWVZ1', 'name': 'Dina Farms Light Yoghurt', 'price': 4, 'weight': 105, 'measurement': 'gm', 'category': 'Dairy and Eggs', 'image': 'https://images.deliveryhero.io/image/darkstores-eg/EGY_6224000432256.JPG', 'stock': 43, '__v': 0}, {'_id': '62a5c098766f4ba646a281cf', 'product_id': 'TTZY1I', 'name': 'Danone Max Yoghurt Drink Peach', 'price': 7, 'weight': 220, 'measurement': 'gm', 'category': 'Dairy and Eggs', 'image': "https://images.deliveryhero.io/image/talabat-nv/Netscribe%20Images(don't%20touch)/Front%20Images/6223002384204.jpg", 'stock': 35, '__v': 0}, {'_id': '62a5c098766f4ba646a281d6', 'product_id': '9YIQ8F', 'name': 'Danone Large Light  Yoghurt', 'price': 6, 'weight': 170, 'measurement': 'gm', 'category': 'Dairy and Eggs', 'image': 'https://images.deliveryhero.io/image/product-information-management/6229a5f8fe38cac0b5b930d3.jpg', 'stock': 38, '__v': 0}, {'_id': '62a5c098766f4ba646a281d9', 'product_id': 'GK95Q2', 'name': 'Danone Sugar Yoghurt', 'price': 3, 'weight': 75, 'measurement': 'gm', 'category': 'Dairy and Eggs', 'image': 'https://images.deliveryhero.io/image/darkstores-eg/EGY_6223002380114.JPG', 'stock': 34, '__v': 0}, {'_id': '62a5c098766f4ba646a281dd', 'product_id': '16AYCS', 'name': 'Dina Farms Dates Milk', 'price': 8.5, 'weight': 250, 'measurement': 'ml', 'category': 'Dairy and Eggs', 'image': 'https://images.deliveryhero.io/image/darkstores-eg/EGY_6224000432140.JPG', 'stock': 21, '__v': 0}, {'_id': '62a5c098766f4ba646a281fb', 'product_id': '47VAR6', 'name': 'Red Bull Sugar Free', 'price': 24.95, 'weight': 250, 'measurement': 'ml', 'category': 'Beverages', 'image': 'https://images.deliveryhero.io/image/darkstores-eg/EGY_90424014.JPG', 'stock': 29, '__v': 0}, {'_id': '62a5c098766f4ba646a2820f', 'product_id': 'Y2CWW7', 'name': 'Fanta Red Apple', 'price': 5.95, 'weight': 300, 'measurement': 'ml', 'category': 'Beverages', 'image': 'https://images.deliveryhero.io/image/darkstores-eg/EGY_5449000305619.JPG', 'stock': 24, '__v': 0}, {'_id': '62a5c098766f4ba646a28220', 'product_id': '8AS70E', 'name': "Temmy's Choco Scoops", 'price': 4.95, 'weight': 30, 'measurement': 'gm', 'category': 'Breakfast', 'image': 'https://images.deliveryhero.io/image/darkstores-eg/EGY_6221012030241.JPG', 'stock': 18, '__v': 0}, {'_id': '62a5c098766f4ba646a28221', 'product_id': 'D84UT8', 'name': "Temmy's Corn Flakes", 'price': 29.75, 'weight': 250, 'measurement': 'g', 'category': 'Breakfast', 'image': 'https://images.deliveryhero.io/image/darkstores-eg/EGY_6221012251080.JPG', 'stock': 3, '__v': 0}, {'_id': '62a5c098766f4ba646a2822f', 'product_id': 'OYHMNW', 'name': "Temmy's Choco Pops", 'price': 19, 'weight': 120, 'measurement': 'gm', 'category': 'Breakfast', 'image': 'https://images.deliveryhero.io/image/product-information-management/61e6849189fe45b497423eee.jpg', 'stock': 36, '__v': 0}, {'_id': '62a5c098766f4ba646a28230', 'product_id': 'BHU89M', 'name': "Temmy's Corn Flakes", 'price': 98.45, 'weight': 1000, 'measurement': 'gm', 'category': 'Breakfast', 'image': 'https://images.deliveryhero.io/image/darkstores-eg/EGY_6221012001081.JPG', 'stock': 2, '__v': 0}, {'_id': '62a5c098766f4ba646a28236', 'product_id': '1214A6', 'name': 'Hero Black Cherry Jam', 'price': 45, 'weight': 350, 'measurement': 'gm', 'category': 'Breakfast', 'image': 'https://images.deliveryhero.io/image/product-information-management/6277b9fcec9bee759efe604f.jpg', 'stock': 36, '__v': 0}, {'_id': '62a5c098766f4ba646a28182', 'product_id': '16FC9D', 'name': 'Mafa Grapes Mix', 'price': 26, 'weight': 500, 'measurement': 'g', 'category': 'Fruits and Vegetables', 'image': 'https://images.deliveryhero.io/image/darkstores-eg/EGY_6223000252505.JPG', 'stock': 5, '__v': 0}, {'_id': '62a5c098766f4ba646a28189', 'product_id': '3VRNS8', 'name': 'Fresh Source Italian Red Apple', 'price': 55, 'weight': 1, 'measurement': 'kg', 'category': 'Fruits and Vegetables', 'image': 'https://images.deliveryhero.io/image/darkstores-eg/EGY_6224010502147.JPG', 'stock': 42, '__v': 0}, {'_id': '62a5c098766f4ba646a2818a', 'product_id': 'AZ7C0F', 'name': 'Fresh Source Mixed Apples', 'price': 69, 'weight': 1, 'measurement': 'kg', 'category': 'Fruits and Vegetables', 'image': 'https://images.deliveryhero.io/image/darkstores-eg/EGY_6224010502253.JPG', 'stock': 36, '__v': 0}, {'_id': '62a5c098766f4ba646a2819c', 'product_id': '9B1QL3', 'name': 'Mooomoo’s Veal Oven Kofta', 'price': 99, 'weight': 425, 'measurement': 'gm', 'category': 'Meat Poultry and Seafood', 'image': 'https://images.deliveryhero.io/image/darkstores-eg/EGY_6224010301122.JPG', 'stock': 4, '__v': 0}, {'_id': '62a5c098766f4ba646a281b2', 'product_id': '9P1R77', 'name': 'Koki Gold Breaded Shrimp', 'price': 106.25, 'weight': 400, 'measurement': 'gm', 'category': 'Meat Poultry and Seafood', 'image': 'https://images.deliveryhero.io/image/darkstores-eg/EGY_6223001827641.JPG', 'stock': 8, '__v': 0}, {'_id': '62a5c098766f4ba646a281c2', 'product_id': '2OIFIM', 'name': 'Reefy  Pasteurized Natural Rayeb Full Cream', 'price': 9.5, 'weight': 250, 'measurement': 'ml', 'category': 'Dairy and Eggs', 'image': 'https://images.deliveryhero.io/image/darkstores-eg/EGY_6224011536172.JPG', 'stock': 43, '__v': 0}, {'_id': '62a5c098766f4ba646a281c7', 'product_id': 'QATO1R', 'name': 'Almarai Yogo Peach Drinking Yogurt', 'price': 12, 'weight': 440, 'measurement': 'ml', 'category': 'Dairy and Eggs', 'image': 'https://images.deliveryhero.io/image/product-information-management/624d65b523de6fa52074febd.jpg', 'stock': 29, '__v': 0}, {'_id': '62a5c098766f4ba646a28226', 'product_id': '4FLX3W', 'name': "Temmy's Choco Scoops", 'price': 38.95, 'weight': 250, 'measurement': 'gm', 'category': 'Breakfast', 'image': 'https://images.deliveryhero.io/image/darkstores-eg/EGY_6221012251240.JPG', 'stock': 15, '__v': 0}, {'_id': '62a5c098766f4ba646a28247', 'product_id': 'BUBO4G', 'name': 'Hero Light Raspberry No Added Sugar Jam', 'price': 50.25, 'weight': 320, 'measurement': 'gm', 'category': 'Breakfast', 'image': 'https://images.deliveryhero.io/image/darkstores/groceries-catalog/products-uae/Hero%20Images/Folder%202/904020_Hero.jpg?webp=0', 'stock': 41, '__v': 0}, {'_id': '62a5c098766f4ba646a2826f', 'product_id': 'RU8GY6', 'name': 'Chipsy Cheese & Onion', 'price': 5, 'weight': 83, 'measurement': 'gm', 'category': 'Chips and Crackers', 'image': 'https://images.deliveryhero.io/image/darkstores-eg/EGY_6221031490125.JPG', 'stock': 18, '__v': 0}, {'_id': '62a5c098766f4ba646a281d8', 'product_id': '9BOTMV', 'name': 'Danone Natural Plain Yoghurt', 'price': 3, 'weight': 75, 'measurement': 'gm', 'category': 'Dairy and Eggs', 'image': 'https://images.deliveryhero.io/image/darkstores-eg/EGY_6223002380336.JPG', 'stock': 45, '__v': 0}, {'_id': '62a5c098766f4ba646a281e8', 'product_id': 'TQ380T', 'name': 'Lamar Tomato Juice 100%', 'price': 23.95, 'weight': 1, 'measurement': 'l', 'category': 'Beverages', 'image': 'https://images.deliveryhero.io/image/darkstores-eg/EGY_6224008637042.JPG', 'stock': 0, '__v': 0}, {'_id': '62a5c098766f4ba646a281f1', 'product_id': 'THCUAA', 'name': 'Lamar Orange Juice 100% -', 'price': 7, 'weight': 200, 'measurement': 'ml', 'category': 'Beverages', 'image': 'https://images.deliveryhero.io/image/darkstores-eg/EGY_6224001105128.JPG', 'stock': 15, '__v': 0}, {'_id': '62a5c098766f4ba646a28214', 'product_id': 'GUI7LB', 'name': '7Up', 'price': 14.5, 'weight': 2, 'measurement': 'l', 'category': 'Beverages', 'image': 'https://images.deliveryhero.io/image/darkstores-eg/EGY_6223001360346.JPG', 'stock': 30, '__v': 0}, {'_id': '62a5c098766f4ba646a28223', 'product_id': 'V9332P', 'name': "Temmy's Sweet Flakes", 'price': 4.95, 'weight': 30, 'measurement': 'gm', 'category': 'Breakfast', 'image': 'https://images.deliveryhero.io/image/darkstores-eg/EGY_6221012030098.JPG', 'stock': 33, '__v': 0}, {'_id': '62a5c098766f4ba646a28237', 'product_id': '9WM4X3', 'name': 'El Mizan Jam Strawberry', 'price': 15, 'weight': 340, 'measurement': 'g', 'category': 'Breakfast', 'image': 'https://images.deliveryhero.io/image/product-information-management/61efaeeb0996fe309e3336c6.jpg', 'stock': 34, '__v': 0}, {'_id': '62a5c098766f4ba646a28252', 'product_id': 'CPSR5W', 'name': 'El Bawadi Molasses', 'price': 15.95, 'weight': 350, 'measurement': 'gm', 'category': 'Breakfast', 'image': 'https://images.deliveryhero.io/image/darkstores-eg/EGY_6223000762066.JPG', 'stock': 32, '__v': 0}, {'_id': '62a5c098766f4ba646a28253', 'product_id': 'JOGCU9', 'name': 'Imtenan Spring Flowers Honey', 'price': 38.95, 'weight': 250, 'measurement': 'gm', 'category': 'Breakfast', 'image': 'https://images.deliveryhero.io/image/darkstores-eg/EGY_6221078111199.JPG', 'stock': 7, '__v': 0}, {'_id': '62a5c098766f4ba646a28256', 'product_id': '8YH7ZL', 'name': 'Imtenan Citrus Honey', 'price': 45.95, 'weight': 250, 'measurement': 'gm', 'category': 'Breakfast', 'image': 'https://images.deliveryhero.io/image/darkstores-eg/EGY_6221078241193.JPG', 'stock': 32, '__v': 0}, {'_id': '62a5c098766f4ba646a2827f', 'product_id': 'WR5KUF', 'name': 'Lion Sweet Chili', 'price': 3, 'weight': 42, 'measurement': 'gm', 'category': 'Chips and Crackers', 'image': 'https://images.deliveryhero.io/image/product-information-management/6231e15c5f285ac030364ff9.jpg', 'stock': 39, '__v': 0}, {'_id': '62a5c098766f4ba646a28281', 'product_id': 'CXQEHP', 'name': 'Bravo Chips With Cheese Herbs', 'price': 3.5, 'weight': 41, 'measurement': 'gm', 'category': 'Chips and Crackers', 'image': 'https://images.deliveryhero.io/image/product-information-management/61d42186debbfe8a380aa220.jpeg', 'stock': 15, '__v': 0}, {'_id': '62a5c098766f4ba646a282a5', 'product_id': 'T787VV', 'name': 'Cadbury Dairy Milk Caramello', 'price': 12, 'weight': 40, 'measurement': 'g', 'category': 'Chocolate and Candy', 'image': 'https://images.deliveryhero.io/image/product-information-management/61f04f0effeafe1f213a5cbc.jpg', 'stock': 38, '__v': 0}, {'_id': '62a5c098766f4ba646a282b4', 'product_id': 'D8P9P2', 'name': 'Snickers Miniatures Chocolate', 'price': 60, 'weight': 150, 'measurement': 'g', 'category': 'Chocolate and Candy', 'image': 'https://images.deliveryhero.io/image/product-information-management/623c6e648567c02880b35992.jpg', 'stock': 30, '__v': 0}, {'_id': '62a5c098766f4ba646a282b5', 'product_id': '12HP6Q', 'name': 'Snickers Minis', 'price': 75, 'weight': 12, 'measurement': 'pieces', 'category': 'Chocolate and Candy', 'image': 'https://images.deliveryhero.io/image/darkstores-jo/Jordan%20Items/JOR-5000159473927.JPG', 'stock': 18, '__v': 0}, {'_id': '62a5c098766f4ba646a2819e', 'product_id': 'SMNETD', 'name': 'Mooomoo’s Breaded Kofta', 'price': 99, 'weight': 425, 'measurement': 'gm', 'category': 'Meat Poultry and Seafood', 'image': 'https://images.deliveryhero.io/image/darkstores-eg/EGY_6221235000656.JPG', 'stock': 35, '__v': 0}, {'_id': '62a5c098766f4ba646a281a5', 'product_id': '14U6T6', 'name': 'Mooomoo’s Veal Fillet Steak', 'price': 480, 'weight': 600, 'measurement': 'gm', 'category': 'Meat Poultry and Seafood', 'image': 'https://images.deliveryhero.io/image/darkstores-eg/EGY_6224010301078.JPG', 'stock': 41, '__v': 0}, {'_id': '62a5c098766f4ba646a281b4', 'product_id': 'MHOS2P', 'name': 'El-Masrya Small Clean Shrimps ', 'price': 175, 'weight': 1, 'measurement': 'kg', 'category': 'Meat Poultry and Seafood', 'image': 'https://images.deliveryhero.io/image/darkstores-eg/EGY_6225000151994.JPG', 'stock': 30, '__v': 0}, {'_id': '62a5c098766f4ba646a281c5', 'product_id': 'YPY7UK', 'name': 'Almarai Greek Drinking Yogurt Strawberry', 'price': 20, 'weight': 240, 'measurement': 'gm', 'category': 'Dairy and Eggs', 'image': 'https://images.deliveryhero.io/image/product-information-management/628252ba274906d2f7b0e4e1.jpg', 'stock': 22, '__v': 0}, {'_id': '62a5c098766f4ba646a281f9', 'product_id': 'PE9BQ2', 'name': 'Red Bull Energy Drink 250 Ml x', 'price': 90, 'weight': 4, 'measurement': 'pcs', 'category': 'Beverages', 'image': 'https://images.deliveryhero.io/image/product-information-management/62668765acb3a96a6f3a5fdf.jpg', 'stock': 4, '__v': 0}, {'_id': '62a5c098766f4ba646a2820e', 'product_id': 'X0IR28', 'name': 'Sprite Can', 'price': 4.95, 'weight': 250, 'measurement': 'ml', 'category': 'Beverages', 'image': 'https://images.deliveryhero.io/image/product-information-management/614ada4fca977e49f42c986b.jpg', 'stock': 27, '__v': 0}, {'_id': '62a5c098766f4ba646a2823f', 'product_id': 'ITR673', 'name': 'Vitrac Creamy Strawberry Jam', 'price': 23.75, 'weight': 430, 'measurement': 'gm', 'category': 'Breakfast', 'image': 'https://images.deliveryhero.io/image/darkstores-eg/EGY_6221024008276.PNG', 'stock': 14, '__v': 0}, {'_id': '62a5c098766f4ba646a28242', 'product_id': 'K13GQL', 'name': 'Vitrac Blueberry Jam', 'price': 30.25, 'weight': 430, 'measurement': 'gm', 'category': 'Breakfast', 'image': 'https://images.deliveryhero.io/image/darkstores-eg/EGY_6221024992407.PNG', 'stock': 40, '__v': 0}, {'_id': '62a5c098766f4ba646a2825f', 'product_id': 'P3AUPU', 'name': 'El Bawadi Molasses', 'price': 10.5, 'weight': 200, 'measurement': 'gm', 'category': 'Breakfast', 'image': 'https://images.deliveryhero.io/image/darkstores-eg/EGY_6223000762073.JPG', 'stock': 49, '__v': 0}, {'_id': '62a5c098766f4ba646a28264', 'product_id': 'GQ5AAB', 'name': 'Hero Citrus Honey', 'price': 96.5, 'weight': 650, 'measurement': 'gm', 'category': 'Breakfast', 'image': 'https://images.deliveryhero.io/image/darkstores-eg/EGY_6221024992605.PNG', 'stock': 16, '__v': 0}, {'_id': '62a5c098766f4ba646a282b8', 'product_id': '1232H0', 'name': 'Twix Mini Biscuits', 'price': 75, 'weight': 227, 'measurement': 'gm', 'category': 'Chocolate and Candy', 'image': 'https://images.deliveryhero.io/image/darkstores-jo/Jordan%20Items/JOR-5000159473026.JPG', 'stock': 39, '__v': 0}, {'_id': '62a5c098766f4ba646a2824b', 'product_id': 'SAYQEP', 'name': 'Hero Light Black Cherry No Added Sugar Jam', 'price': 50.25, 'weight': 320, 'measurement': 'gm', 'category': 'Breakfast', 'image': 'https://images.deliveryhero.io/image/darkstores/groceries-catalog/products-uae/Hero%20Images/Folder%202/904017_Hero.jpg?webp=', 'stock': 3, '__v': 0}, {'_id': '62a5c098766f4ba646a2824c', 'product_id': '7HFU7O', 'name': 'Vitrac Creamy Jam Fig', 'price': 23.75, 'weight': 430, 'measurement': 'gm', 'category': 'Breakfast', 'image': 'https://images.deliveryhero.io/image/darkstores-eg/EGY_6221024008290.PNG', 'stock': 44, '__v': 0}, {'_id': '62a5c098766f4ba646a2827b', 'product_id': '8MPKDQ', 'name': 'Tiger family - Seasoned Cheese', 'price': 3, 'weight': 74, 'measurement': 'gm', 'category': 'Chips and Crackers', 'image': 'https://images.deliveryhero.io/image/talabat-nv/Kuwait/Enrichment/Egypt/6223000506752.jpg', 'stock': 23, '__v': 0}, {'_id': '62a5c098766f4ba646a28286', 'product_id': 'DVL5QY', 'name': 'Big Chips Super - Sweet CHLI', 'price': 5, 'weight': 42, 'measurement': 'gm', 'category': 'Chips and Crackers', 'image': 'https://images.deliveryhero.io/image/product-information-management/6242efd58d2fe66d5c9190a2.jpg', 'stock': 8, '__v': 0}, {'_id': '62a5c098766f4ba646a282ab', 'product_id': 'N1IWM2', 'name': 'Galaxy Fruit & Nut Chocolate Bar', 'price': 12, 'weight': 36, 'measurement': 'g', 'category': 'Chocolate and Candy', 'image': 'https://images.deliveryhero.io/image/product-information-management/61e93b2097a81fe038fe7417.jpg', 'stock': 34, '__v': 0}, {'_id': '62a5c098766f4ba646a282ba', 'product_id': 'RTENC9', 'name': 'Mars Miniatures Chocolate Bars', 'price': 60, 'weight': 150, 'measurement': 'g', 'category': 'Chocolate and Candy', 'image': 'https://images.deliveryhero.io/image/darkstores/groceries-catalog/products-uae/UAE_4011100023710.jpg', 'stock': 36, '__v': 0}, {'_id': '62a5c098766f4ba646a282bc', 'product_id': '8ZJ5FE', 'name': 'Mackintosh Assorted Chocolate', 'price': 94.95, 'weight': 200, 'measurement': 'gm', 'category': 'Chocolate and Candy', 'image': 'https://images.deliveryhero.io/image/darkstores/groceries-catalog/products-uae/Hero%20Images/Folder%202/901671_Hero.jpg?webp=0', 'stock': 0, '__v': 0}, {'_id': '62a5c098766f4ba646a28198', 'product_id': '4K3HK1', 'name': 'Mooomoo’s Veal Meat Cubes', 'price': 120, 'weight': 450, 'measurement': 'gm', 'category': 'Meat Poultry and Seafood', 'image': 'https://images.deliveryhero.io/image/darkstores-eg/EGY_6224010301030.JPG', 'stock': 14, '__v': 0}, {'_id': '62a5c098766f4ba646a281a1', 'product_id': '4UZS0S', 'name': 'Mooomoo’s Marinated Shawerma', 'price': 126, 'weight': 450, 'measurement': 'gm', 'category': 'Meat Poultry and Seafood', 'image': 'https://images.deliveryhero.io/image/product-information-management/622a3134706068d52c731e90.jpg', 'stock': 23, '__v': 0}, {'_id': '62a5c098766f4ba646a2829d', 'product_id': 'TJZVTU', 'name': 'Kitkat Chocolate W/ Lotus', 'price': 12, 'weight': 40.5, 'measurement': 'g', 'category': 'Chocolate and Candy', 'image': 'https://images.deliveryhero.io/image/darkstores-om/Product_Images/OM_6294003597849.png', 'stock': 36, '__v': 0}, {'_id': '62a5c098766f4ba646a282ae', 'product_id': 'EVVIJM', 'name': 'Kitkat Chunky Mini Choco', 'price': 81, 'weight': 16, 'measurement': 'pcs', 'category': 'Chocolate and Candy', 'image': 'https://images.deliveryhero.io/image/darkstores/groceries-catalog/products-uae/UAE_6294003545581.jpg', 'stock': 14, '__v': 0}, {'_id': '62a5c098766f4ba646a282b2', 'product_id': 'WL0XRH', 'name': 'Galaxy Hazelnut Mini', 'price': 65, 'weight': 162.5, 'measurement': 'gm', 'category': 'Chocolate and Candy', 'image': 'https://images.deliveryhero.io/image/product-information-management/6217766fde8aa9ea975195d6.jpg', 'stock': 41, '__v': 0}, {'_id': '62a5c098766f4ba646a28168', 'product_id': 'YOXL9M', 'name': 'Nabat Kale Frisee', 'price': 38.5, 'weight': 100, 'measurement': 'gm', 'category': 'Fruits and Vegetables', 'image': 'https://images.deliveryhero.io/image/darkstores-eg/EGY_6224008824206.JPG', 'stock': 10, '__v': 0}, {'_id': '62a5c098766f4ba646a28173', 'product_id': '70QXOF', 'name': 'MAFA Tomatoes', 'price': 23, 'weight': 1, 'measurement': 'kg', 'category': 'Fruits and Vegetables', 'image': 'https://images.deliveryhero.io/image/product-information-management/61e548246d9e46fc3e13f8d7.jpg', 'stock': 25, '__v': 0}, {'_id': '62a5c098766f4ba646a28178', 'product_id': 'XO2341', 'name': 'Fresh Source Tomatoes', 'price': 21, 'weight': 1, 'measurement': 'kg', 'category': 'Fruits and Vegetables', 'image': 'https://images.deliveryhero.io/image/product-information-management/61d5e8289851a91497826204.jpg', 'stock': 39, '__v': 0}, {'_id': '62a5c098766f4ba646a28186', 'product_id': 'MAGM0Z', 'name': 'Fresh Source Avocado', 'price': 40, 'weight': 0.5, 'measurement': 'kg', 'category': 'Fruits and Vegetables', 'image': 'https://images.deliveryhero.io/image/darkstores-eg/EGY_6224010502185.JPG', 'stock': 46, '__v': 0}, {'_id': '62a5c098766f4ba646a281a7', 'product_id': 'XD03D6', 'name': 'Shahd Whole Chicken', 'price': 78.95, 'weight': 1000, 'measurement': 'gm', 'category': 'Meat Poultry and Seafood', 'image': 'https://images.deliveryhero.io/image/darkstores-eg/EGY_6223002610600.JPG', 'stock': 39, '__v': 0}, {'_id': '62a5c098766f4ba646a281a8', 'product_id': 'CR6NRF', 'name': 'Shahd Whole Chicken', 'price': 84.95, 'weight': 1000, 'measurement': 'gm', 'category': 'Meat Poultry and Seafood', 'image': 'https://images.deliveryhero.io/image/darkstores-eg/EGY_6223002610617.PNG', 'stock': 27, '__v': 0}, {'_id': '62a5c098766f4ba646a281aa', 'product_id': 'IGRCAU', 'name': 'Shahd Chicken Liver & Gizzard', 'price': 39.95, 'weight': 500, 'measurement': 'gm', 'category': 'Meat Poultry and Seafood', 'image': 'https://images.deliveryhero.io/image/darkstores-eg/EGY_6223002610716.PNG', 'stock': 49, '__v': 0}, {'_id': '62a5c098766f4ba646a281ac', 'product_id': '9NWODF', 'name': 'Shahd Chicken Liver', 'price': 43.95, 'weight': 500, 'measurement': 'gm', 'category': 'Meat Poultry and Seafood', 'image': 'https://images.deliveryhero.io/image/darkstores-eg/EGY_6223002610723.PNG', 'stock': 5, '__v': 0}, {'_id': '62a5c098766f4ba646a281b6', 'product_id': 'N3XFF1', 'name': 'Organic White Eggs', 'price': 35.95, 'weight': 10, 'measurement': 'pcs', 'category': 'Dairy and Eggs', 'image': 'https://images.deliveryhero.io/image/product-information-management/6208e63584add388a1ebef7f.jpg', 'stock': 39, '__v': 0}, {'_id': '62a5c098766f4ba646a281df', 'product_id': 'YM34Q0', 'name': 'Dina Farms Dates Milk', 'price': 24, 'weight': 0.85, 'measurement': 'l', 'category': 'Dairy and Eggs', 'image': 'https://images.deliveryhero.io/image/darkstores-eg/EGY_6224000432041.JPG', 'stock': 33, '__v': 0}, {'_id': '62a5c098766f4ba646a281e2', 'product_id': 'VHQOOX', 'name': 'Juhayna Pure Juice Orange & Carrot', 'price': 23.45, 'weight': 1, 'measurement': 'l', 'category': 'Beverages', 'image': 'https://images.deliveryhero.io/image/darkstores-eg/EGY_6222014335587.JPG', 'stock': 47, '__v': 0}, {'_id': '62a5c098766f4ba646a2820a', 'product_id': 'N6KMZZ', 'name': 'Pepsi PET', 'price': 3, 'weight': 250, 'measurement': 'ml', 'category': 'Beverages', 'image': 'https://images.deliveryhero.io/image/darkstores-eg/EGY_6223001362951.JPG', 'stock': 31, '__v': 0}, {'_id': '62a5c098766f4ba646a28212', 'product_id': 'DV8GLG', 'name': 'Mirinda Plus Citrus', 'price': 5.95, 'weight': 300, 'measurement': 'ml', 'category': 'Beverages', 'image': 'https://images.deliveryhero.io/image/product-information-management/612008e05cedddb4939f3207.jpg', 'stock': 7, '__v': 0}, {'_id': '62a5c098766f4ba646a2821d', 'product_id': 'HV379Q', 'name': 'Mirinda Green apple', 'price': 3, 'weight': 250, 'measurement': 'm', 'category': 'Beverages', 'image': 'https://images.deliveryhero.io/image/darkstores-eg/EGY_6223001362968.JPG', 'stock': 3, '__v': 0}, {'_id': '62a5c098766f4ba646a28222', 'product_id': 'CQMANN', 'name': "Temmy's Corn Flakes", 'price': 4.95, 'weight': 30, 'measurement': 'gm', 'category': 'Breakfast', 'image': 'https://images.deliveryhero.io/image/darkstores-eg/EGY_6221012030081.JPG', 'stock': 21, '__v': 0}, {'_id': '62a5c098766f4ba646a28231', 'product_id': 'KE8Y65', 'name': 'Temmy’s Choco Rice', 'price': 52.95, 'weight': 375, 'measurement': 'gm', 'category': 'Breakfast', 'image': 'https://images.deliveryhero.io/image/darkstores-eg/EGY_6221012000824.JPG', 'stock': 4, '__v': 0}, {'_id': '62a5c098766f4ba646a2823d', 'product_id': 'VO9RAJ', 'name': 'El Mizan Fig Jam', 'price': 15, 'weight': 340, 'measurement': 'gm', 'category': 'Breakfast', 'image': 'https://images.deliveryhero.io/image/product-information-management/61efb03911035378bb723c8d.jpg', 'stock': 49, '__v': 0}, {'_id': '62a5c098766f4ba646a2817b', 'product_id': 'Y9YIN2', 'name': 'MAFA Eggplant Big Size', 'price': 12, 'weight': 1, 'measurement': 'kg', 'category': 'Fruits and Vegetables', 'image': 'https://images.deliveryhero.io/image/product-information-management/628e337a6f1a61a409096d95.jpg', 'stock': 8, '__v': 0}, {'_id': '62a5c098766f4ba646a2818c', 'product_id': '7HV183', 'name': 'Fresh Source Pineapple', 'price': 78, 'weight': 1, 'measurement': 'pcs', 'category': 'Fruits and Vegetables', 'image': 'https://images.deliveryhero.io/image/product-information-management/61dd5dcf2ab393cf21eca453.jpg', 'stock': 27, '__v': 0}, {'_id': '62a5c098766f4ba646a28190', 'product_id': 'BGHVO4', 'name': 'Hygiene Mix Berries Holland', 'price': 175, 'weight': 150, 'measurement': 'gm', 'category': 'Fruits and Vegetables', 'image': 'https://images.deliveryhero.io/image/product-information-management/6217607d689773c39b47d888.jpg', 'stock': 21, '__v': 0}, {'_id': '62a5c098766f4ba646a28192', 'product_id': 'TULXOF', 'name': 'Hygiene Blueberries Holland', 'price': 135, 'weight': 125, 'measurement': 'gm', 'category': 'Fruits and Vegetables', 'image': 'https://images.deliveryhero.io/image/product-information-management/6217616ce2558e3f966abbdf.jpg', 'stock': 31, '__v': 0}, {'_id': '62a5c098766f4ba646a2819a', 'product_id': 'N9N00K', 'name': 'Mooomoo’s Burger', 'price': 107, 'weight': 400, 'measurement': 'gm', 'category': 'Meat Poultry and Seafood', 'image': 'https://images.deliveryhero.io/image/darkstores-eg/EGY_6221235000694.JPG', 'stock': 11, '__v': 0}, {'_id': '62a5c098766f4ba646a281b0', 'product_id': 'D1ATJQ', 'name': 'El Leheimy Whole Chicken Marinated Cajun', 'price': 109.95, 'weight': 1, 'measurement': 'kg', 'category': 'Meat Poultry and Seafood', 'image': 'https://images.deliveryhero.io/image/darkstores-eg/EGY_6223004278341.JPG', 'stock': 2, '__v': 0}, {'_id': '62a5c098766f4ba646a281c4', 'product_id': 'UG2H4E', 'name': 'Almarai Greek Drinking Yogurt Blueberries', 'price': 20, 'weight': 240, 'measurement': 'gm', 'category': 'Dairy and Eggs', 'image': 'https://images.deliveryhero.io/image/product-information-management/6282530a97679ce068a0b728.jpg', 'stock': 29, '__v': 0}, {'_id': '62a5c098766f4ba646a281e3', 'product_id': 'K5RH6A', 'name': 'Juhayna Pure Juice Orange', 'price': 6.95, 'weight': 235, 'measurement': 'ml', 'category': 'Beverages', 'image': 'https://images.deliveryhero.io/image/darkstores-eg/EGY_6222014330667.JPG', 'stock': 40, '__v': 0}, {'_id': '62a5c098766f4ba646a281e4', 'product_id': '61RB19', 'name': 'Juhayna Pure Juice Tomato', 'price': 23.45, 'weight': 1, 'measurement': 'l', 'category': 'Beverages', 'image': 'https://images.deliveryhero.io/image/darkstores-eg/EGY_6222014335549.JPG', 'stock': 16, '__v': 0}, {'_id': '62a5c098766f4ba646a281e6', 'product_id': '4KM2ET', 'name': 'Lamar Cranberry Blend  Juice 100%', 'price': 23.95, 'weight': 1, 'measurement': 'l', 'category': 'Beverages', 'image': 'https://images.deliveryhero.io/image/darkstores-eg/EGY_6224008637035.JPG', 'stock': 13, '__v': 0}, {'_id': '62a5c098766f4ba646a281ef', 'product_id': '9GL0L6', 'name': 'Lamar Mango Juice 100% -', 'price': 7, 'weight': 200, 'measurement': 'ml', 'category': 'Beverages', 'image': 'https://images.deliveryhero.io/image/darkstores-eg/EGY_6224008637165.JPG', 'stock': 32, '__v': 0}, {'_id': '62a5c098766f4ba646a281f6', 'product_id': 'VTYSIG', 'name': 'Dili  Doum Sugre Free Juice', 'price': 37.95, 'weight': 1, 'measurement': 'l', 'category': 'Beverages', 'image': 'https://images.deliveryhero.io/image/product-information-management/61c9a68f36de0c0c14b1af7a.jpg', 'stock': 30, '__v': 0}, {'_id': '62a5c098766f4ba646a28204', 'product_id': 'NA850J', 'name': 'Mr. Brown Macadamia Nut Iced Coffee', 'price': 28.5, 'weight': 240, 'measurement': 'ml', 'category': 'Beverages', 'image': 'https://images.deliveryhero.io/image/product-information-management/61b7083abe3415140adad5b1.jpg', 'stock': 14, '__v': 0}, {'_id': '62a5c098766f4ba646a28216', 'product_id': '33AWQN', 'name': '7up ', 'price': 5.25, 'weight': 400, 'measurement': 'ml', 'category': 'Beverages', 'image': 'https://images.deliveryhero.io/image/darkstores-eg/EGY_6223001361862.JPG', 'stock': 31, '__v': 0}, {'_id': '62a5c098766f4ba646a2822a', 'product_id': 'VLZ2FZ', 'name': "Temmy's Honey Pops", 'price': 4.95, 'weight': 30, 'measurement': 'gm', 'category': 'Breakfast', 'image': 'https://images.deliveryhero.io/image/darkstores-eg/EGY_6221012030012.JPG', 'stock': 40, '__v': 0}, {'_id': '62a5c098766f4ba646a2823c', 'product_id': 'J6J1EZ', 'name': 'El Mizan Jam Strawberry', 'price': 27, 'weight': 720, 'measurement': 'gm', 'category': 'Breakfast', 'image': 'https://images.deliveryhero.io/image/product-information-management/61efaf5311035378bb723c87.jpg', 'stock': 4, '__v': 0}, {'_id': '62a5c098766f4ba646a28266', 'product_id': 'QGZ5RE', 'name': 'Paradise Vanilla Ice Cream ', 'price': 65, 'weight': 850, 'measurement': 'ml', 'category': 'Ice Cream', 'image': 'https://images.deliveryhero.io/image/darkstores-eg/EGY_6221007028796.JPG', 'stock': 5, '__v': 0}, {'_id': '62a5c098766f4ba646a28267', 'product_id': 'NFE0LW', 'name': 'Paradise Chocolate Ice Cream ', 'price': 75, 'weight': 850, 'measurement': 'ml', 'category': 'Ice Cream', 'image': 'https://images.deliveryhero.io/image/darkstores-eg/EGY_6221007028772.JPG', 'stock': 44, '__v': 0}, {'_id': '62a5c098766f4ba646a28274', 'product_id': 'IKOM7L', 'name': 'Chipsy Flaming Hot', 'price': 6, 'weight': 77, 'measurement': 'gm', 'category': 'Chips and Crackers', 'image': 'https://images.deliveryhero.io/image/product-information-management/61f64981285d0229b8eb639c.jpg', 'stock': 15, '__v': 0}, {'_id': '62a5c098766f4ba646a28275', 'product_id': 'S4RRPW', 'name': 'Tiger Super -Seasoned Cheese', 'price': 5, 'weight': 74, 'measurement': 'gm', 'category': 'Chips and Crackers', 'image': 'https://images.deliveryhero.io/image/talabat-nv/Kuwait/6223000508596.jpg', 'stock': 17, '__v': 0}, {'_id': '62a5c098766f4ba646a2827d', 'product_id': 'OMT2X8', 'name': 'Tiger family - Chili & Lemon', 'price': 3, 'weight': 74, 'measurement': 'gm', 'category': 'Chips and Crackers', 'image': 'https://images.deliveryhero.io/image/talabat-nv/Kuwait/Enrichment/Egypt/6223000506769.jpg', 'stock': 17, '__v': 0}, {'_id': '62a5c098766f4ba646a28285', 'product_id': 'C1X6VS', 'name': 'Tiger Super - Smoky BBQ', 'price': 5, 'weight': 42, 'measurement': 'gm', 'category': 'Chips and Crackers', 'image': 'https://images.deliveryhero.io/image/product-information-management/622b593f5dbaf9bcbfdf56c1.jpg', 'stock': 9, '__v': 0}, {'_id': '62a5c098766f4ba646a2828e', 'product_id': 'FNA9M6', 'name': 'Top Of The Pop Cheese Popcorn', 'price': 18.5, 'weight': 100, 'measurement': 'g', 'category': 'Chips and Crackers', 'image': 'https://images.deliveryhero.io/image/darkstores-eg/EGY_3800203050669.JPG', 'stock': 47, '__v': 0}, {'_id': '62a5c098766f4ba646a2829b', 'product_id': 'Q93NCL', 'name': 'Cadbury Dairy Milk Oreo Chocolate', 'price': 12, 'weight': 38, 'measurement': 'g', 'category': 'Chocolate and Candy', 'image': 'https://images.deliveryhero.io/image/product-information-management/61f04c432e0fbfa708792ebe.jpg', 'stock': 32, '__v': 0}, {'_id': '62a5c098766f4ba646a282a0', 'product_id': 'Y54OR8', 'name': 'Galaxy Flutes Four Fingers', 'price': 10, 'weight': 45, 'measurement': 'g', 'category': 'Chocolate and Candy', 'image': 'https://images.deliveryhero.io/image/product-information-management/61e93aabd302c0553d488192.jpg', 'stock': 4, '__v': 0}, {'_id': '62a5c098766f4ba646a282a3', 'product_id': 'LFPAG0', 'name': 'Cadbury Dairy Milk Hazelnut', 'price': 18, 'weight': 56, 'measurement': 'gm', 'category': 'Chocolate and Candy', 'image': 'https://images.deliveryhero.io/image/product-information-management/61f049f8cd27c598ea4a8f85.jpg', 'stock': 11, '__v': 0}, {'_id': '62a5c098766f4ba646a282aa', 'product_id': 'KMPZPB', 'name': 'Galaxy Smooth Milk Chocolate Bar', 'price': 12, 'weight': 36, 'measurement': 'g', 'category': 'Chocolate and Candy', 'image': 'https://images.deliveryhero.io/image/product-information-management/61e93bf7adaaf70ac34572b6.jpg', 'stock': 18, '__v': 0}, {'_id': '62a5c098766f4ba646a2824a', 'product_id': 'A8B7VG', 'name': 'Vitrac Creamy Apricot Jam', 'price': 23.75, 'weight': 430, 'measurement': 'gm', 'category': 'Breakfast', 'image': 'https://images.deliveryhero.io/image/darkstores-eg/EGY_6221024008283.PNG', 'stock': 32, '__v': 0}, {'_id': '62a5c098766f4ba646a28255', 'product_id': '5K4E66', 'name': 'Imtenan Spring Flowers Honey', 'price': 114.95, 'weight': 800, 'measurement': 'gm', 'category': 'Breakfast', 'image': 'https://images.deliveryhero.io/image/darkstores-eg/EGY_6221078111410.JPG', 'stock': 6, '__v': 0}, {'_id': '62a5c098766f4ba646a28260', 'product_id': 'FY18RK', 'name': 'Al Shifa Honey Manuka', 'price': 449.95, 'weight': 250, 'measurement': 'gm', 'category': 'Breakfast', 'image': 'https://images.deliveryhero.io/image/darkstores-jo/Jordan%20Items/JOR-6281073212147.jpg', 'stock': 30, '__v': 0}, {'_id': '62a5c098766f4ba646a28261', 'product_id': 'WYWS8Q', 'name': 'Sunbulah Honey With Ginger', 'price': 269.95, 'weight': 250, 'measurement': 'gm', 'category': 'Breakfast', 'image': 'https://images.deliveryhero.io/image/darkstores-jo/Jordan%20Items/JOR-6281073212307.jpg', 'stock': 39, '__v': 0}, {'_id': '62a5c098766f4ba646a28273', 'product_id': '6A6SEB', 'name': 'Chipsy Flaming Hot Lemon', 'price': 6, 'weight': 77, 'measurement': 'gm', 'category': 'Chips and Crackers', 'image': 'https://images.deliveryhero.io/image/darkstores-eg/EGY_6221031494994.JPG', 'stock': 45, '__v': 0}, {'_id': '62a5c098766f4ba646a28295', 'product_id': '4UC2N4', 'name': 'American Garden Microwave Popcorn Lite', 'price': 71.5, 'weight': 3.5, 'measurement': 'oz', 'category': 'Chips and Crackers', 'image': 'https://images.deliveryhero.io/image/darkstores-qatar/Products/QR_900893.jpg', 'stock': 48, '__v': 0}, {'_id': '62a5c098766f4ba646a282a8', 'product_id': '3AJQA0', 'name': 'Galaxy Caramel Chocolate', 'price': 12, 'weight': 40, 'measurement': 'g', 'category': 'Chocolate and Candy', 'image': 'https://images.deliveryhero.io/image/product-information-management/61e93a3bd21f9603afaf18d4.jpg', 'stock': 0, '__v': 0}, {'_id': '62a5c098766f4ba646a282ac', 'product_id': 'MERYNJ', 'name': 'Galaxy Coconut Brittle', 'price': 12, 'weight': 36, 'measurement': 'gm', 'category': 'Chocolate and Candy', 'image': 'https://images.deliveryhero.io/image/product-information-management/62121fa0803747a6960b5dfc.jpg', 'stock': 6, '__v': 0}, {'_id': '62a5c098766f4ba646a28169', 'product_id': 'MBE0WJ', 'name': 'Nabat Baby Green Remix', 'price': 40, 'weight': 125, 'measurement': 'gm', 'category': 'Fruits and Vegetables', 'image': 'https://images.deliveryhero.io/image/darkstores-eg/EGY_6224008824107.JPG', 'stock': 16, '__v': 0}, {'_id': '62a5c098766f4ba646a28180', 'product_id': 'JX40EG', 'name': 'My Very Strawberries', 'price': 50, 'weight': 450, 'measurement': 'gm', 'category': 'Fruits and Vegetables', 'image': 'https://images.deliveryhero.io/image/darkstores-eg/EGY_6221023006969.JPG', 'stock': 6, '__v': 0}, {'_id': '62a5c098766f4ba646a2818e', 'product_id': 'D0NC97', 'name': 'Sharbatly Italian Kanzy Apple', 'price': 68, 'weight': 1, 'measurement': 'kg', 'category': 'Fruits and Vegetables', 'image': 'https://images.deliveryhero.io/image/darkstores-eg/EGY_6225920001522.JPG', 'stock': 2, '__v': 0}, {'_id': '62a5c098766f4ba646a28196', 'product_id': '2EM9B7', 'name': 'Hygiene Baby Corn Thailand', 'price': 55, 'weight': 125, 'measurement': 'gm', 'category': 'Fruits and Vegetables', 'image': 'https://images.deliveryhero.io/image/darkstores-eg/EGY_6221034098551.JPG', 'stock': 18, '__v': 0}, {'_id': '62a5c098766f4ba646a2819b', 'product_id': 'WUK31X', 'name': 'Mooomoo’s Rice Kofta', 'price': 66, 'weight': 330, 'measurement': 'gm', 'category': 'Meat Poultry and Seafood', 'image': 'https://images.deliveryhero.io/image/darkstores-eg/EGY_6221235000649.JPG', 'stock': 11, '__v': 0}, {'_id': '62a5c098766f4ba646a281ad', 'product_id': '53M40P', 'name': 'Shahd Chicken Shish', 'price': 59.95, 'weight': 400, 'measurement': 'gm', 'category': 'Meat Poultry and Seafood', 'image': 'https://images.deliveryhero.io/image/darkstores-eg/EGY_6223002610693.PNG', 'stock': 45, '__v': 0}, {'_id': '62a5c098766f4ba646a281b1', 'product_id': 'SNYC1E', 'name': 'El Leheimy Whole Chicken Marinated  Mobahhar', 'price': 109.95, 'weight': 1, 'measurement': 'kg', 'category': 'Meat Poultry and Seafood', 'image': 'https://images.deliveryhero.io/image/darkstores-eg/EGY_6223004278334.JPG', 'stock': 9, '__v': 0}, {'_id': '62a5c098766f4ba646a281c3', 'product_id': 'BL8FHM', 'name': 'Almarai Yogo Strawberry Drinking Yogurt', 'price': 12, 'weight': 440, 'measurement': 'ml', 'category': 'Dairy and Eggs', 'image': 'https://images.deliveryhero.io/image/product-information-management/624d638e095fbf0e77ff13d8.jpg', 'stock': 40, '__v': 0}, {'_id': '62a5c098766f4ba646a281d2', 'product_id': 'E0JLH9', 'name': 'Reefy Natural Light Yogurt', 'price': 6, 'weight': 170, 'measurement': 'gm', 'category': 'Dairy and Eggs', 'image': 'https://images.deliveryhero.io/image/darkstores-eg/EGY_764460288919.JPG', 'stock': 39, '__v': 0}, {'_id': '62a5c098766f4ba646a281d4', 'product_id': 'SLSA1W', 'name': 'Dina Farms Natural Yoghurt', 'price': 4, 'weight': 105, 'measurement': 'gm', 'category': 'Dairy and Eggs', 'image': 'https://images.deliveryhero.io/image/darkstores-eg/EGY_6224000432072.JPG', 'stock': 32, '__v': 0}, {'_id': '62a5c098766f4ba646a281f0', 'product_id': 'V2S04Q', 'name': 'Lamar Pineapple Juice 100%', 'price': 7, 'weight': 200, 'measurement': 'ml', 'category': 'Beverages', 'image': 'https://images.deliveryhero.io/image/darkstores-eg/EGY_6224001105845.JPG', 'stock': 7, '__v': 0}, {'_id': '62a5c098766f4ba646a281f4', 'product_id': 'IFBGVB', 'name': 'Dili Natural Orange Sugar Free Juice', 'price': 49.49, 'weight': 1, 'measurement': 'l', 'category': 'Beverages', 'image': 'https://images.deliveryhero.io/image/darkstores-eg/EGY_6224000060442.JPG', 'stock': 41, '__v': 0}, {'_id': '62a5c098766f4ba646a281fd', 'product_id': 'N91RY0', 'name': 'Red Bull Red Edition', 'price': 24.95, 'weight': 250, 'measurement': 'ml', 'category': 'Beverages', 'image': 'https://images.deliveryhero.io/image/darkstores-eg/EGY_90435768.JPG', 'stock': 44, '__v': 0}, {'_id': '62a5c098766f4ba646a28219', 'product_id': 'TBVZDZ', 'name': 'Mirinda Green apple', 'price': 10.75, 'weight': 1, 'measurement': 'l', 'category': 'Beverages', 'image': 'https://images.deliveryhero.io/image/darkstores-eg/EGY_6223001360353.JPG', 'stock': 29, '__v': 0}, {'_id': '62a5c098766f4ba646a2821c', 'product_id': 'IG3YHP', 'name': 'Mirinda Plus Tangerine', 'price': 5.25, 'weight': 400, 'measurement': 'ml', 'category': 'Beverages', 'image': 'https://images.deliveryhero.io/image/darkstores-eg/EGY_6223001365679.JPG', 'stock': 36, '__v': 0}, {'_id': '62a5c098766f4ba646a2823a', 'product_id': 'IYAPB9', 'name': 'Halwani Apricot Jam', 'price': 33, 'weight': 750, 'measurement': 'gm', 'category': 'Breakfast', 'image': 'https://images.deliveryhero.io/image/darkstores-eg/EGY_6221029610122.JPG', 'stock': 3, '__v': 0}, {'_id': '62a5c098766f4ba646a2823b', 'product_id': 'MRS8M1', 'name': 'Halwani Light Apricot Jam', 'price': 24, 'weight': 380, 'measurement': 'gm', 'category': 'Breakfast', 'image': 'https://images.deliveryhero.io/image/darkstores-eg/EGY_6221029610153.JPG', 'stock': 27, '__v': 0}, {'_id': '62a5c098766f4ba646a28258', 'product_id': '58UKQX', 'name': 'Imtenan Black Seed Honey', 'price': 54.95, 'weight': 250, 'measurement': 'gm', 'category': 'Breakfast', 'image': 'https://images.deliveryhero.io/image/darkstores-eg/EGY_6221078091194.JPG', 'stock': 17, '__v': 0}, {'_id': '62a5c098766f4ba646a28269', 'product_id': 'LDRY0H', 'name': 'Paradise Vanila Caramel Ice Cream Tub ', 'price': 75, 'weight': 850, 'measurement': 'ml', 'category': 'Ice Cream', 'image': 'https://images.deliveryhero.io/image/darkstores-eg/EGY_6221007028789.JPG', 'stock': 39, '__v': 0}, {'_id': '62a5c098766f4ba646a28277', 'product_id': 'XU4TPC', 'name': 'Lion Ketchup', 'price': 5, 'weight': 74, 'measurement': 'gm', 'category': 'Chips and Crackers', 'image': 'https://images.deliveryhero.io/image/product-information-management/6231e27935ebc2d1ae85333d.jpg', 'stock': 33, '__v': 0}, {'_id': '62a5c098766f4ba646a28179', 'product_id': 'D9G5JW', 'name': 'MAFA Red Onion', 'price': 8, 'weight': 1, 'measurement': 'kg', 'category': 'Fruits and Vegetables', 'image': 'https://images.deliveryhero.io/image/product-information-management/61e569339fd494aad7b47c87.jpg', 'stock': 26, '__v': 0}, {'_id': '62a5c098766f4ba646a2817f', 'product_id': 'P2NUER', 'name': 'My Very Strawberries', 'price': 30, 'weight': 250, 'measurement': 'gm', 'category': 'Fruits and Vegetables', 'image': 'https://images.deliveryhero.io/image/darkstores-eg/EGY_6221023006464.JPG', 'stock': 43, '__v': 0}, {'_id': '62a5c098766f4ba646a28183', 'product_id': 'AC9T5T', 'name': 'Mafa Grapes White', 'price': 26, 'weight': 500, 'measurement': 'g', 'category': 'Fruits and Vegetables', 'image': 'https://images.deliveryhero.io/image/darkstores-eg/EGY_6223000252390.JPG', 'stock': 47, '__v': 0}, {'_id': '62a5c098766f4ba646a28184', 'product_id': 'TWLB8N', 'name': 'MAFA Orange For Juice', 'price': 31, 'weight': 3, 'measurement': 'kg', 'category': 'Fruits and Vegetables', 'image': 'https://images.deliveryhero.io/image/product-information-management/61e56a246d9e46fc3e13f8f6.jpg', 'stock': 25, '__v': 0}, {'_id': '62a5c098766f4ba646a2818d', 'product_id': 'OXWTF2', 'name': 'My Very Blackberries', 'price': 80, 'weight': 125, 'measurement': 'gm', 'category': 'Fruits and Vegetables', 'image': 'https://images.deliveryhero.io/image/darkstores-eg/EGY_6221023006471.JPG', 'stock': 42, '__v': 0}, {'_id': '62a5c098766f4ba646a281a0', 'product_id': 'S0JLPL', 'name': 'Mooomoo’s Burger W/Cheese', 'price': 90, 'weight': 300, 'measurement': 'gm', 'category': 'Meat Poultry and Seafood', 'image': 'https://images.deliveryhero.io/image/darkstores-eg/EGY_6221235000601.JPG', 'stock': 19, '__v': 0}, {'_id': '62a5c098766f4ba646a281b8', 'product_id': 'PKN24S', 'name': 'Al Kheir White eggs', 'price': 66.95, 'weight': 30, 'measurement': 'pcs', 'category': 'Dairy and Eggs', 'image': 'https://images.deliveryhero.io/image/product-information-management/6208e5db54a5c7f7b8779315.jpg', 'stock': 39, '__v': 0}, {'_id': '62a5c098766f4ba646a281d7', 'product_id': 'OFGMZ8', 'name': 'Danone Light Yoghert', 'price': 4, 'weight': 105, 'measurement': 'gm', 'category': 'Dairy and Eggs', 'image': 'https://images.deliveryhero.io/image/talabat-nv/Kuwait/Enrichment/6223002380022.jpg', 'stock': 22, '__v': 0}, {'_id': '62a5c098766f4ba646a281e7', 'product_id': 'KSSRDN', 'name': 'Lamar Cranberry 100% -', 'price': 7, 'weight': 200, 'measurement': 'ml', 'category': 'Beverages', 'image': 'https://images.deliveryhero.io/image/darkstores-eg/EGY_6224008637172.JPG', 'stock': 16, '__v': 0}, {'_id': '62a5c098766f4ba646a281e9', 'product_id': '6RM330', 'name': 'Lamar Pineapple Juice 100%', 'price': 23.95, 'weight': 1, 'measurement': 'l', 'category': 'Beverages', 'image': 'https://images.deliveryhero.io/image/darkstores-eg/EGY_6224001105425.JPG', 'stock': 19, '__v': 0}, {'_id': '62a5c098766f4ba646a281f2', 'product_id': 'DWI58A', 'name': 'Lamar Pomegranate Juice 100% -', 'price': 7, 'weight': 200, 'measurement': 'ml', 'category': 'Beverages', 'image': 'https://images.deliveryhero.io/image/darkstores-eg/EGY_6224001105661.JPG', 'stock': 5, '__v': 0}, {'_id': '62a5c098766f4ba646a281f5', 'product_id': 'IVQ63I', 'name': 'Dili Natural Lemon Mint Juice', 'price': 15.95, 'weight': 290, 'measurement': 'ml', 'category': 'Beverages', 'image': 'https://images.deliveryhero.io/image/darkstores-eg/EGY_6224000060169.JPG', 'stock': 20, '__v': 0}, {'_id': '62a5c098766f4ba646a28202', 'product_id': '2XWKHR', 'name': 'Mr. Brown Vanilla Iced Coffee', 'price': 28.5, 'weight': 240, 'measurement': 'ml', 'category': 'Beverages', 'image': 'https://images.deliveryhero.io/image/darkstores-QAtar/Products/QR_901924.jpg', 'stock': 16, '__v': 0}, {'_id': '62a5c098766f4ba646a28209', 'product_id': 'EUO7F9', 'name': 'Coca Cola Can', 'price': 4.95, 'weight': 250, 'measurement': 'ml', 'category': 'Beverages', 'image': 'https://images.deliveryhero.io/image/product-information-management/611520c5c28ae3eeb0c74a0d.jpg', 'stock': 24, '__v': 0}, {'_id': '62a5c098766f4ba646a28213', 'product_id': 'DKLDO0', 'name': 'Mirinda Orange ', 'price': 10.75, 'weight': 1, 'measurement': 'l', 'category': 'Beverages', 'image': 'https://images.deliveryhero.io/image/darkstores-eg/EGY_6223001360810.JPG', 'stock': 43, '__v': 0}, {'_id': '62a5c098766f4ba646a28248', 'product_id': '7LMIQG', 'name': 'Vitrac Light  Jam Fig', 'price': 21.5, 'weight': 220, 'measurement': 'gm', 'category': 'Breakfast', 'image': 'https://images.deliveryhero.io/image/darkstores-eg/EGY_6221024220036.JPG', 'stock': 48, '__v': 0}, {'_id': '62a5c098766f4ba646a28251', 'product_id': 'NY8P1I', 'name': 'El Mizan Molasse', 'price': 24, 'weight': 720, 'measurement': 'gm', 'category': 'Breakfast', 'image': 'https://images.deliveryhero.io/image/product-information-management/628dd922c78258b11f954d1d.jpg', 'stock': 18, '__v': 0}, {'_id': '62a5c098766f4ba646a28257', 'product_id': 'EUJDWS', 'name': 'Imtenan Citrus Honey', 'price': 68.95, 'weight': 450, 'measurement': 'gm', 'category': 'Breakfast', 'image': 'https://images.deliveryhero.io/image/darkstores-eg/EGY_6221078241278.JPG', 'stock': 0, '__v': 0}, {'_id': '62a5c098766f4ba646a28280', 'product_id': 'CDFYJB', 'name': 'Crunchy Chilli&Lemon', 'price': 5, 'weight': 80, 'measurement': 'gm', 'category': 'Chips and Crackers', 'image': 'https://images.deliveryhero.io/image/darkstores-eg/EGY_6221031491832.JPG', 'stock': 21, '__v': 0}, {'_id': '62a5c098766f4ba646a28282', 'product_id': 'UY7E7W', 'name': 'Lion Spicy Cheese', 'price': 3, 'weight': 42, 'measurement': 'gm', 'category': 'Chips and Crackers', 'image': 'https://images.deliveryhero.io/image/product-information-management/6231e0fba2e2a2676256764f.jpg', 'stock': 44, '__v': 0}, {'_id': '62a5c098766f4ba646a2828f', 'product_id': 'M8M5A8', 'name': 'Top Of The Pop Salt Popcorn', 'price': 18.5, 'weight': 100, 'measurement': 'gm', 'category': 'Chips and Crackers', 'image': 'https://images.deliveryhero.io/image/darkstores-eg/EGY_3800203050683.JPG', 'stock': 24, '__v': 0}, {'_id': '62a5c098766f4ba646a2828b', 'product_id': 'RW4UXV', 'name': 'Halo Protein Puffs Sour Cream & Onion ', 'price': 9.95, 'weight': 40, 'measurement': 'gm', 'category': 'Chips and Crackers', 'image': 'https://images.deliveryhero.io/image/darkstores-eg/EGY_6224010447073.JPG', 'stock': 33, '__v': 0}, {'_id': '62a5c098766f4ba646a28293', 'product_id': 'V4J5R2', 'name': 'American Garden Microwave Popcorn Butter', 'price': 71.5, 'weight': 100, 'measurement': 'gm', 'category': 'Chips and Crackers', 'image': 'https://images.deliveryhero.io/image/darkstores/groceries-catalog/products-uae/UAE_17273550316v1.jpg', 'stock': 14, '__v': 0}, {'_id': '62a5c098766f4ba646a28296', 'product_id': 'U5VV69', 'name': 'Top Of The Pop Honey  Popcorn', 'price': 18.5, 'weight': 100, 'measurement': 'gm', 'category': 'Chips and Crackers', 'image': 'https://images.deliveryhero.io/image/product-information-management/611e790f8aef13a1aafa7dca.jpg', 'stock': 48, '__v': 0}, {'_id': '62a5c098766f4ba646a2829f', 'product_id': 'XMMVS7', 'name': 'Twix Twin Chocolate Bars', 'price': 12, 'weight': 50, 'measurement': 'g', 'category': 'Chocolate and Candy', 'image': 'https://images.deliveryhero.io/image/talabat-nv/Kuwait/5000159459228.jpg', 'stock': 34, '__v': 0}, {'_id': '62a5c098766f4ba646a282a6', 'product_id': 'CC9104', 'name': 'Cadbury Dairy Milk Plain', 'price': 18, 'weight': 59, 'measurement': 'gm', 'category': 'Chocolate and Candy', 'image': 'https://images.deliveryhero.io/image/product-information-management/61f049a4e95dd6d63f64b938.jpg', 'stock': 14, '__v': 0}, {'_id': '62a5c098766f4ba646a282b0', 'product_id': '46KHLP', 'name': 'Kitkat Chocolate W/ Lotus Minis', 'price': 75, 'weight': 122.5, 'measurement': 'g', 'category': 'Chocolate and Candy', 'image': 'https://images.deliveryhero.io/image/darkstores/groceries-catalog/products-uae/UAE_6294003592578.png', 'stock': 28, '__v': 0}, {'_id': '62a5c098766f4ba646a282b9', 'product_id': '81QPSC', 'name': 'Bounty Minis', 'price': 75, 'weight': 227, 'measurement': 'gm', 'category': 'Chocolate and Candy', 'image': 'https://images.deliveryhero.io/image/darkstores-eg/EGY_5000159473279.JPG', 'stock': 33, '__v': 0}, {'_id': '62a5c098766f4ba646a2816a', 'product_id': 'PGOT6W', 'name': 'Nabat Super Green', 'price': 33, 'weight': 100, 'measurement': 'gm', 'category': 'Fruits and Vegetables', 'image': 'https://images.deliveryhero.io/image/darkstores-eg/EGY_6224008824169.JPG', 'stock': 0, '__v': 0}, {'_id': '62a5c098766f4ba646a28172', 'product_id': 'UPIEC5', 'name': 'MAFA Iceberg', 'price': 8, 'weight': 1, 'measurement': 'pcs', 'category': 'Fruits and Vegetables', 'image': 'https://images.deliveryhero.io/image/product-information-management/61e544f148deb9a0928b0945.jpg', 'stock': 41, '__v': 0}, {'_id': '62a5c098766f4ba646a2816c', 'product_id': 'NFRNCN', 'name': 'Varny Peeled Garlic Local', 'price': 17, 'weight': 100, 'measurement': 'gm', 'category': 'Fruits and Vegetables', 'image': 'https://images.deliveryhero.io/image/darkstores-eg/EGY_6225000442375.JPG', 'stock': 36, '__v': 0}, {'_id': '62a5c098766f4ba646a2816d', 'product_id': 'ZZ4YKL', 'name': 'Varny Garlic Local Net', 'price': 17, 'weight': 200, 'measurement': 'gm', 'category': 'Fruits and Vegetables', 'image': 'https://images.deliveryhero.io/image/darkstores-eg/EGY_6225000442313.JPG', 'stock': 37, '__v': 0}, {'_id': '62a5c098766f4ba646a28170', 'product_id': '8BYSPT', 'name': 'My Very Baby Potatoe', 'price': 25, 'weight': 500, 'measurement': 'gm', 'category': 'Fruits and Vegetables', 'image': 'https://images.deliveryhero.io/image/darkstores-eg/EGY_6221023006440.JPG', 'stock': 48, '__v': 0}, {'_id': '62a5c098766f4ba646a28171', 'product_id': 'IY4IUV', 'name': 'MAFA Cucumber', 'price': 11, 'weight': 1, 'measurement': 'kg', 'category': 'Fruits and Vegetables', 'image': 'https://images.deliveryhero.io/image/product-information-management/61e5499928a51767784ffa66.jpg', 'stock': 36, '__v': 0}, {'_id': '62a5c098766f4ba646a28175', 'product_id': 'Y6YXQ6', 'name': 'MAFA Capsicum Mix', 'price': 19, 'weight': 500, 'measurement': 'gm', 'category': 'Fruits and Vegetables', 'image': 'https://images.deliveryhero.io/image/product-information-management/61e546d46d9e46fc3e13f8d4.jpg', 'stock': 44, '__v': 0}, {'_id': '62a5c098766f4ba646a2817c', 'product_id': 'DQXCF0', 'name': 'MAFA Zucchini', 'price': 11, 'weight': 1, 'measurement': 'kg', 'category': 'Fruits and Vegetables', 'image': 'https://images.deliveryhero.io/image/product-information-management/61e568756d9e46fc3e13f8f3.jpg', 'stock': 31, '__v': 0}, {'_id': '62a5c098766f4ba646a2819d', 'product_id': 'EMSV7W', 'name': 'Mooomoo’s Veal Meat Balls', 'price': 90, 'weight': 350, 'measurement': 'gm', 'category': 'Meat Poultry and Seafood', 'image': 'https://images.deliveryhero.io/image/darkstores-eg/EGY_6224010301139.JPG', 'stock': 9, '__v': 0}, {'_id': '62a5c098766f4ba646a281a3', 'product_id': 'V2SEID', 'name': 'Mooomoo’s Oriental Kofta', 'price': 107, 'weight': 500, 'measurement': 'gm', 'category': 'Meat Poultry and Seafood', 'image': 'https://images.deliveryhero.io/image/product-information-management/622a32e97ce4a78020faef7f.jpg', 'stock': 20, '__v': 0}, {'_id': '62a5c098766f4ba646a281a4', 'product_id': 'L6POCT', 'name': 'Mooomoo’s Australian Lamb Racks', 'price': 294.95, 'weight': 450, 'measurement': 'gm', 'category': 'Meat Poultry and Seafood', 'image': 'https://images.deliveryhero.io/image/darkstores-eg/EGY_6224010301160.JPG', 'stock': 36, '__v': 0}, {'_id': '62a5c098766f4ba646a281af', 'product_id': 'ADAQY8', 'name': 'Koki Whole Chicken 950 -', 'price': 69.95, 'weight': 1000, 'measurement': 'gm', 'category': 'Meat Poultry and Seafood', 'image': 'https://images.deliveryhero.io/image/darkstores-eg/EGY_6223000041079.JPG', 'stock': 44, '__v': 0}, {'_id': '62a5c098766f4ba646a281b7', 'product_id': 'NRNHX5', 'name': 'Organic Baladi Eggs', 'price': 36.95, 'weight': 10, 'measurement': 'pcs', 'category': 'Dairy and Eggs', 'image': 'https://images.deliveryhero.io/image/product-information-management/6229d6de4e250347c64a5662.jpg', 'stock': 43, '__v': 0}, {'_id': '62a5c098766f4ba646a281de', 'product_id': '1S2G3R', 'name': 'Dina Farms Strawberry Milk', 'price': 8.5, 'weight': 250, 'measurement': 'ml', 'category': 'Dairy and Eggs', 'image': 'https://images.deliveryhero.io/image/darkstores-eg/EGY_6224000432157.JPG', 'stock': 18, '__v': 0}, {'_id': '62a5c098766f4ba646a281eb', 'product_id': 'IV7HIC', 'name': 'Lamar Orange Juice 100%', 'price': 23.95, 'weight': 1, 'measurement': 'l', 'category': 'Beverages', 'image': 'https://images.deliveryhero.io/image/darkstores-eg/EGY_6224001105081.JPG', 'stock': 47, '__v': 0}, {'_id': '62a5c098766f4ba646a28206', 'product_id': 'XGAKKM', 'name': 'Pepsi ', 'price': 10.75, 'weight': 1, 'measurement': 'l', 'category': 'Beverages', 'image': 'https://images.deliveryhero.io/image/darkstores-eg/EGY_6223001360766.JPG', 'stock': 4, '__v': 0}, {'_id': '62a5c098766f4ba646a2822c', 'product_id': 'HPDF7I', 'name': 'Temmys Fruit Rings', 'price': 35, 'weight': 250, 'measurement': 'g', 'category': 'Breakfast', 'image': 'https://images.deliveryhero.io/image/darkstores-eg/EGY_6221012251110.JPG', 'stock': 5, '__v': 0}, {'_id': '62a5c098766f4ba646a2822d', 'product_id': '4RV8SI', 'name': "Temmy's Corn Flakes", 'price': 52, 'weight': 500, 'measurement': 'gm', 'category': 'Breakfast', 'image': 'https://images.deliveryhero.io/image/darkstores-eg/EGY_6221012505084.JPG', 'stock': 15, '__v': 0}, {'_id': '62a5c098766f4ba646a28243', 'product_id': '65TS2D', 'name': 'Vitrac Fig Jam', 'price': 23.75, 'weight': 430, 'measurement': 'gm', 'category': 'Breakfast', 'image': 'https://images.deliveryhero.io/image/darkstores-eg/EGY_6221024030031.PNG', 'stock': 44, '__v': 0}, {'_id': '62a5c098766f4ba646a2817d', 'product_id': 'VVKXVM', 'name': 'MAFA Sweet Potatoes', 'price': 37, 'weight': 3, 'measurement': 'kg', 'category': 'Fruits and Vegetables', 'image': 'https://images.deliveryhero.io/image/darkstores-eg/EGY_6223000255315.JPG', 'stock': 19, '__v': 0}, {'_id': '62a5c098766f4ba646a28181', 'product_id': '0IVM2S', 'name': 'My Very Blueberries', 'price': 110, 'weight': 125, 'measurement': 'gm', 'category': 'Fruits and Vegetables', 'image': 'https://images.deliveryhero.io/image/darkstores-eg/EGY_6221023006525.JPG', 'stock': 10, '__v': 0}, {'_id': '62a5c098766f4ba646a2819f', 'product_id': 'T0R30Z', 'name': 'Mooomoo’s Veal Fillet Strips', 'price': 175, 'weight': 450, 'measurement': 'gm', 'category': 'Meat Poultry and Seafood', 'image': 'https://images.deliveryhero.io/image/darkstores-eg/EGY_6224010301085.JPG', 'stock': 18, '__v': 0}, {'_id': '62a5c098766f4ba646a281bb', 'product_id': 'IXOQJC', 'name': 'Al Kheir Red Eggs', 'price': 66.95, 'weight': 30, 'measurement': 'pcs', 'category': 'Dairy and Eggs', 'image': 'https://images.deliveryhero.io/image/product-information-management/6208e59384add388a1ebef57.jpg', 'stock': 2, '__v': 0}, {'_id': '62a5c098766f4ba646a281c6', 'product_id': 'IKOBDL', 'name': 'Juhayna Zabado Mango', 'price': 5.95, 'weight': 220, 'measurement': 'gm', 'category': 'Dairy and Eggs', 'image': 'https://images.deliveryhero.io/image/product-information-management/625ea1ab9678effe268c4335.jpg', 'stock': 37, '__v': 0}, {'_id': '62a5c098766f4ba646a281cb', 'product_id': 'RRC2S5', 'name': 'Danone Max Yoghurt Drink Strawberry', 'price': 7, 'weight': 220, 'measurement': 'gm', 'category': 'Dairy and Eggs', 'image': 'https://images.deliveryhero.io/image/product-information-management/62278aaa8f0c46091e6f56bd.jpg', 'stock': 5, '__v': 0}, {'_id': '62a5c098766f4ba646a281cc', 'product_id': 'C82M42', 'name': 'Danone Max Yoghurt Drink Mango', 'price': 7, 'weight': 220, 'measurement': 'gm', 'category': 'Dairy and Eggs', 'image': 'https://images.deliveryhero.io/image/darkstores-eg/EGY_6223002384228.JPG', 'stock': 22, '__v': 0}, {'_id': '62a5c098766f4ba646a281db', 'product_id': 'KDDA0K', 'name': 'Activia Yogurt Big Cup', 'price': 7, 'weight': 170, 'measurement': 'gm', 'category': 'Dairy and Eggs', 'image': 'https://images.deliveryhero.io/image/darkstores-eg/EGY_6223002382873.JPG', 'stock': 17, '__v': 0}, {'_id': '62a5c098766f4ba646a281f3', 'product_id': 'E6ICCQ', 'name': 'Dili Natural Lemon Mint Juice', 'price': 37.95, 'weight': 1, 'measurement': 'l', 'category': 'Beverages', 'image': 'https://images.deliveryhero.io/image/darkstores-eg/EGY_6224000060152.JPG', 'stock': 24, '__v': 0}, {'_id': '62a5c098766f4ba646a281fa', 'product_id': 'H2W8H4', 'name': 'Red Bull White Edition', 'price': 24.95, 'weight': 250, 'measurement': 'ml', 'category': 'Beverages', 'image': 'https://images.deliveryhero.io/image/darkstores-eg/EGY_90435775.JPG', 'stock': 19, '__v': 0}, {'_id': '62a5c098766f4ba646a28217', 'product_id': 'VPOOHN', 'name': 'Mirinda Orange PET', 'price': 3, 'weight': 250, 'measurement': 'ml', 'category': 'Beverages', 'image': 'https://images.deliveryhero.io/image/darkstores-eg/EGY_6223001362975.JPG', 'stock': 29, '__v': 0}, {'_id': '62a5c098766f4ba646a28225', 'product_id': '6XRE1Q', 'name': "Temmy's Choco Pops", 'price': 4.95, 'weight': 30, 'measurement': 'gm', 'category': 'Breakfast', 'image': 'https://images.deliveryhero.io/image/darkstores-eg/EGY_6221012030074.JPG', 'stock': 1, '__v': 0}, {'_id': '62a5c098766f4ba646a28227', 'product_id': 'BS3J1Z', 'name': "Temmy's Choco Rice", 'price': 4.95, 'weight': 30, 'measurement': 'gm', 'category': 'Breakfast', 'image': 'https://images.deliveryhero.io/image/product-information-management/6204d66748971ba44d16e08b.jpg', 'stock': 13, '__v': 0}, {'_id': '62a5c098766f4ba646a28235', 'product_id': 'DR2NF1', 'name': "Temmy's Fruit Rings", 'price': 59.95, 'weight': 500, 'measurement': 'gm', 'category': 'Breakfast', 'image': 'https://images.deliveryhero.io/image/darkstores-eg/EGY_622101200039.JPG', 'stock': 44, '__v': 0}, {'_id': '62a5c098766f4ba646a28238', 'product_id': 'KA0IU0', 'name': 'Halwani Fig Jam', 'price': 16, 'weight': 380, 'measurement': 'gm', 'category': 'Breakfast', 'image': 'https://images.deliveryhero.io/image/darkstores-eg/EGY_6221029620114.JPG', 'stock': 5, '__v': 0}, {'_id': '62a5c098766f4ba646a28241', 'product_id': 'CSP3I8', 'name': 'Vitrac  Apricot Jam', 'price': 23.75, 'weight': 430, 'measurement': 'gm', 'category': 'Breakfast', 'image': 'https://images.deliveryhero.io/image/darkstores-eg/EGY_6221024030024.PNG', 'stock': 42, '__v': 0}, {'_id': '62a5c098766f4ba646a28244', 'product_id': 'TLVSEQ', 'name': 'Vitrac Light Strawberry Jam', 'price': 21.5, 'weight': 220, 'measurement': 'gm', 'category': 'Breakfast', 'image': 'https://images.deliveryhero.io/image/darkstores-eg/EGY_6221024220012.JPG', 'stock': 12, '__v': 0}, {'_id': '62a5c098766f4ba646a28166', 'product_id': '9QY1OK', 'name': 'Nabat Batavia Lettuce head Green', 'price': 26, 'weight': 1, 'measurement': 'pc', 'category': 'Fruits and Vegetables', 'image': 'https://images.deliveryhero.io/image/darkstores-eg/EGY_6224008824022.JPG', 'stock': 0, '__v': 0}, {'_id': '62a5c098766f4ba646a2825b', 'product_id': '090TDM', 'name': 'Isis  Pure  Honey', 'price': 104.95, 'weight': 900, 'measurement': 'gm', 'category': 'Breakfast', 'image': 'https://images.deliveryhero.io/image/darkstores-eg/EGY_6223000479803.JPG', 'stock': 4, '__v': 0}, {'_id': '62a5c098766f4ba646a28265', 'product_id': 'ABFLCM', 'name': 'Hero Spring Blossom Honey', 'price': 57.5, 'weight': 365, 'measurement': 'gm', 'category': 'Breakfast', 'image': 'https://images.deliveryhero.io/image/darkstores/groceries-catalog/products-uae/Hero%20Images/Folder%202/906322_Hero.jpg?webp=0', 'stock': 24, '__v': 0}, {'_id': '62a5c098766f4ba646a28270', 'product_id': 'ZOYM0N', 'name': 'Chipsy Tomato', 'price': 5, 'weight': 83, 'measurement': 'gm', 'category': 'Chips and Crackers', 'image': 'https://images.deliveryhero.io/image/darkstores-eg/EGY_6221031490149.JPG', 'stock': 7, '__v': 0}, {'_id': '62a5c098766f4ba646a2827a', 'product_id': '45JOQO', 'name': 'Tiger family -  Smoky BBQ', 'price': 3, 'weight': 74, 'measurement': 'gm', 'category': 'Chips and Crackers', 'image': 'https://images.deliveryhero.io/image/product-information-management/622bca505dbaf9bcbfdf575f.jpg', 'stock': 32, '__v': 0}, {'_id': '62a5c098766f4ba646a2827e', 'product_id': '8BC6IB', 'name': 'Tiger family -Tomato', 'price': 3, 'weight': 74, 'measurement': 'gm', 'category': 'Chips and Crackers', 'image': 'https://images.deliveryhero.io/image/product-information-management/62431a83511e2dd96df77ca1.jpg', 'stock': 9, '__v': 0}, {'_id': '62a5c098766f4ba646a28283', 'product_id': '0ZRJU1', 'name': 'Lion Ketchup', 'price': 3, 'weight': 42, 'measurement': 'gm', 'category': 'Chips and Crackers', 'image': 'https://images.deliveryhero.io/image/product-information-management/6231dff5a2e2a2676256762a.jpg', 'stock': 17, '__v': 0}, {'_id': '62a5c098766f4ba646a2828d', 'product_id': 'XH6M0S', 'name': 'Halo Protein Puffs Sriracha ', 'price': 9.95, 'weight': 40, 'measurement': 'gm', 'category': 'Chips and Crackers', 'image': 'https://images.deliveryhero.io/image/darkstores-eg/EGY_6224010447066.JPG', 'stock': 6, '__v': 0}, {'_id': '62a5c098766f4ba646a28297', 'product_id': 'ZPT1OR', 'name': 'Cadbury Dairy Milk Plain', 'price': 6, 'weight': 22, 'measurement': 'gm', 'category': 'Chocolate and Candy', 'image': 'https://images.deliveryhero.io/image/product-information-management/61f04889cd27c598ea4a8f5f.jpg', 'stock': 39, '__v': 0}, {'_id': '62a5c098766f4ba646a2829a', 'product_id': 'YPSDO9', 'name': 'CADBURY MARVELLOUS JELLY ', 'price': 12, 'weight': 38, 'measurement': 'gm', 'category': 'Chocolate and Candy', 'image': 'https://images.deliveryhero.io/image/product-information-management/61f04ab32e0fbfa708792ebb.jpg', 'stock': 45, '__v': 0}, {'_id': '62a5c098766f4ba646a282af', 'product_id': 'ACXMRW', 'name': 'Cadbury Marvellous Creations With Jelly Popping Candy Shells Chocolate', 'price': 50, 'weight': 16, 'measurement': 'gm', 'category': 'Chocolate and Candy', 'image': 'https://images.deliveryhero.io/image/product-information-management/6242e125596c56579611f45d.jpg', 'stock': 35, '__v': 0}, {'_id': '62a5c098766f4ba646a282b6', 'product_id': 'K57NVN', 'name': 'Twix Miniatures Chocolate', 'price': 60, 'weight': 150, 'measurement': 'g', 'category': 'Chocolate and Candy', 'image': 'https://images.deliveryhero.io/image/darkstores/groceries-catalog/products-uae/UAE_5000159309332.jpg', 'stock': 25, '__v': 0}, {'_id': '62a5c098766f4ba646a2825a', 'product_id': 'I2TL1A', 'name': 'Imtenan Herbal Honey', 'price': 41.5, 'weight': 250, 'measurement': 'gm', 'category': 'Breakfast', 'image': 'https://images.deliveryhero.io/image/darkstores-eg/EGY_6221078381196.JPG', 'stock': 1, '__v': 0}, {'_id': '62a5c098766f4ba646a2825e', 'product_id': 'L2ODGX', 'name': 'Isis  Black Seed Honey', 'price': 106.95, 'weight': 900, 'measurement': 'gm', 'category': 'Breakfast', 'image': 'https://images.deliveryhero.io/image/darkstores-eg/EGY_6223000479810.JPG', 'stock': 6, '__v': 0}, {'_id': '62a5c098766f4ba646a2826d', 'product_id': '6XA3P9', 'name': 'Oreo Ice Cream Sandwich  ', 'price': 15, 'weight': 135, 'measurement': 'ml', 'category': 'Ice Cream', 'image': 'https://images.deliveryhero.io/image/darkstores-eg/EGY_6221007028277.JPG', 'stock': 32, '__v': 0}, {'_id': '62a5c098766f4ba646a2827c', 'product_id': 'XA21IT', 'name': 'Lion Chili & Lemon', 'price': 5, 'weight': 74, 'measurement': 'gm', 'category': 'Chips and Crackers', 'image': 'https://images.deliveryhero.io/image/product-information-management/6231e2d414ecbbe96f4e1f54.jpg', 'stock': 49, '__v': 0}, {'_id': '62a5c098766f4ba646a28294', 'product_id': 'SX2P5L', 'name': 'American Garden Natural Popcorn', 'price': 71.5, 'weight': 273, 'measurement': 'gm', 'category': 'Chips and Crackers', 'image': 'https://images.deliveryhero.io/image/darkstores/groceries-catalog/products-uae/UAE_17273550309v1.jpg', 'stock': 49, '__v': 0}, {'_id': '62a5c098766f4ba646a282bb', 'product_id': 'MDW2AE', 'name': 'Mars Minis', 'price': 75, 'weight': 275, 'measurement': 'gm', 'category': 'Chocolate and Candy', 'image': 'https://images.deliveryhero.io/image/darkstores-jo/Jordan%20Items/JOR-5000159474573.JPG', 'stock': 10, '__v': 0}, {'_id': '62a5c098766f4ba646a2816f', 'product_id': 'VA34F9', 'name': 'Farmers Red Cabbage', 'price': 15, 'weight': 1, 'measurement': 'pc', 'category': 'Fruits and Vegetables', 'image': 'https://images.deliveryhero.io/image/darkstores-eg/EGY_6224008266167.JPG', 'stock': 7, '__v': 0}, {'_id': '62a5c098766f4ba646a28191', 'product_id': 'MCBO23', 'name': 'Hygiene Raspberries Holland', 'price': 145, 'weight': 125, 'measurement': 'gm', 'category': 'Fruits and Vegetables', 'image': 'https://images.deliveryhero.io/image/product-information-management/6217601f17c25e2288d4d5af.jpg', 'stock': 11, '__v': 0}, {'_id': '62a5c098766f4ba646a281ab', 'product_id': '6J6LV9', 'name': 'Shahd Chicken Fillet', 'price': 149.95, 'weight': 1, 'measurement': 'kg', 'category': 'Meat Poultry and Seafood', 'image': 'https://images.deliveryhero.io/image/darkstores-eg/EGY_6223002610662.PNG', 'stock': 42, '__v': 0}, {'_id': '62a5c098766f4ba646a281c9', 'product_id': 'DS0KZU', 'name': 'Juhayna Greek Yoghurt Drink Passionfruit', 'price': 18, 'weight': 250, 'measurement': 'gm', 'category': 'Dairy and Eggs', 'image': 'https://images.deliveryhero.io/image/darkstores-eg/EGY_6222014300202.JPG', 'stock': 0, '__v': 0}, {'_id': '62a5c098766f4ba646a281d3', 'product_id': 'NZAS2G', 'name': 'Almarai Plain Light Yogurt', 'price': 4, 'weight': 105, 'measurement': 'gm', 'category': 'Dairy and Eggs', 'image': 'https://images.deliveryhero.io/image/darkstores-eg/EGY_6223001872931.JPG', 'stock': 47, '__v': 0}, {'_id': '62a5c098766f4ba646a281da', 'product_id': 'STADQX', 'name': 'Activia Yogurt Light', 'price': 5, 'weight': 120, 'measurement': 'gm', 'category': 'Dairy and Eggs', 'image': 'https://images.deliveryhero.io/image/product-information-management/6232f9442883770e38db92b2.jpg', 'stock': 30, '__v': 0}, {'_id': '62a5c098766f4ba646a281e5', 'product_id': 'P3LLIT', 'name': 'Lamar Mango Juice 100% -', 'price': 23.95, 'weight': 1, 'measurement': 'l', 'category': 'Beverages', 'image': 'https://images.deliveryhero.io/image/darkstores-eg/EGY_6224008637028.JPG', 'stock': 16, '__v': 0}, {'_id': '62a5c098766f4ba646a281ee', 'product_id': '2YAUGJ', 'name': 'Lamar Apple Juice 100%', 'price': 7, 'weight': 200, 'measurement': 'ml', 'category': 'Beverages', 'image': 'https://images.deliveryhero.io/image/darkstores-eg/EGY_6224001105135.JPG', 'stock': 43, '__v': 0}, {'_id': '62a5c098766f4ba646a2820c', 'product_id': 'S61ZNB', 'name': 'Coca Cola Original Drink', 'price': 5.95, 'weight': 300, 'measurement': 'ml', 'category': 'Beverages', 'image': 'https://images.deliveryhero.io/image/product-information-management/625424bd1f5d4462b6495921.jpg', 'stock': 10, '__v': 0}, {'_id': '62a5c098766f4ba646a28210', 'product_id': '1JSY0F', 'name': 'Mirinda Plus Tangerine', 'price': 5.95, 'weight': 300, 'measurement': 'ml', 'category': 'Beverages', 'image': 'https://images.deliveryhero.io/image/product-information-management/61200a6bd7e8468df259e469.jpg', 'stock': 4, '__v': 0}, {'_id': '62a5c098766f4ba646a2821f', 'product_id': 'OYLT6A', 'name': "Temmy's Fruit Rings", 'price': 4.95, 'weight': 30, 'measurement': 'gm', 'category': 'Breakfast', 'image': 'https://images.deliveryhero.io/image/darkstores-eg/EGY_6221012031118.JPG', 'stock': 32, '__v': 0}, {'_id': '62a5c098766f4ba646a28228', 'product_id': 'EXSD8M', 'name': 'Temmys Honey Pops', 'price': 35, 'weight': 250, 'measurement': 'g', 'category': 'Breakfast', 'image': 'https://images.deliveryhero.io/image/darkstores-eg/EGY_6221012251011.JPG', 'stock': 13, '__v': 0}, {'_id': '62a5c098766f4ba646a2822e', 'product_id': '8SFR85', 'name': "Temmy's Choco Rice", 'price': 38.95, 'weight': 250, 'measurement': 'gm', 'category': 'Breakfast', 'image': 'https://images.deliveryhero.io/image/darkstores-eg/EGY_6221012251042.JPG', 'stock': 32, '__v': 0}, {'_id': '62a5c098766f4ba646a28234', 'product_id': '6EW6FF', 'name': 'Temmy’s Sweet Flakes', 'price': 48, 'weight': 375, 'measurement': 'gm', 'category': 'Breakfast', 'image': 'https://images.deliveryhero.io/image/darkstores-eg/EGY_6221012000879.JPG', 'stock': 46, '__v': 0}, {'_id': '62a5c098766f4ba646a28239', 'product_id': 'IYS5OP', 'name': 'Halwani Light Orange Jam', 'price': 16, 'weight': 380, 'measurement': 'gm', 'category': 'Breakfast', 'image': 'https://images.deliveryhero.io/image/darkstores-eg/EGY_6221029600154.JPG', 'stock': 23, '__v': 0}, {'_id': '62a5c098766f4ba646a28240', 'product_id': 'GEKGE7', 'name': 'Vitrac Raspberry Jam', 'price': 30.25, 'weight': 430, 'measurement': 'gm', 'category': 'Breakfast', 'image': 'https://images.deliveryhero.io/image/darkstores-eg/EGY_6221024992391.PNG', 'stock': 49, '__v': 0}, {'_id': '62a5c098766f4ba646a28249', 'product_id': '670IPY', 'name': 'Hero Raspberry Jam', 'price': 45, 'weight': 350, 'measurement': 'gm', 'category': 'Breakfast', 'image': 'https://images.deliveryhero.io/image/darkstores/groceries-catalog/products-uae/Hero%20Images/Folder%202/905348_Hero.jpg?webp=0', 'stock': 49, '__v': 0}, {'_id': '62a5c098766f4ba646a2824f', 'product_id': '5LGB3Z', 'name': 'El Mizan Molasse', 'price': 13, 'weight': 350, 'measurement': 'gm', 'category': 'Breakfast', 'image': 'https://images.deliveryhero.io/image/product-information-management/627a0710bcfb57b9f1476dfc.JPG', 'stock': 26, '__v': 0}, {'_id': '62a5c098766f4ba646a28289', 'product_id': 'UFG46V', 'name': "Cheetos Flamin' Hot  ", 'price': 5, 'weight': 74, 'measurement': 'gm', 'category': 'Chips and Crackers', 'image': 'https://images.deliveryhero.io/image/product-information-management/61642e091913183d2a4d4126.jpg', 'stock': 31, '__v': 0}, {'_id': '62a5c098766f4ba646a28167', 'product_id': '1LYDU6', 'name': 'Nabat Kale Nero', 'price': 38.5, 'weight': 100, 'measurement': 'gm', 'category': 'Fruits and Vegetables', 'image': 'https://images.deliveryhero.io/image/darkstores-eg/EGY_6224008824053.JPG', 'stock': 0, '__v': 0}, {'_id': '62a5c098766f4ba646a2816b', 'product_id': 'XLSN4R', 'name': 'Nabat Washed Baby Batavia', 'price': 33, 'weight': 100, 'measurement': 'gm', 'category': 'Fruits and Vegetables', 'image': 'https://images.deliveryhero.io/image/darkstores-eg/EGY_6224008824213.JPG', 'stock': 48, '__v': 0}, {'_id': '62a5c098766f4ba646a28195', 'product_id': 'DQK7JG', 'name': 'Hygiene Blackberries Holland', 'price': 145, 'weight': 125, 'measurement': 'gm', 'category': 'Fruits and Vegetables', 'image': 'https://images.deliveryhero.io/image/product-information-management/62163933963f78221cc8941e.jpg', 'stock': 28, '__v': 0}, {'_id': '62a5c098766f4ba646a28197', 'product_id': '4DM8MA', 'name': 'Hygiene Cherry Tomatoes Honey Holland', 'price': 115, 'weight': 200, 'measurement': 'gm', 'category': 'Fruits and Vegetables', 'image': 'https://images.deliveryhero.io/image/product-information-management/621638d502d4d2d190668a51.jpg', 'stock': 2, '__v': 0}, {'_id': '62a5c098766f4ba646a28199', 'product_id': 'JIT79I', 'name': 'Mooomoo’s Veal Mince Meat', 'price': 120, 'weight': 450, 'measurement': 'gm', 'category': 'Meat Poultry and Seafood', 'image': 'https://images.deliveryhero.io/image/darkstores-eg/EGY_6224010301115.JPG', 'stock': 10, '__v': 0}, {'_id': '62a5c098766f4ba646a281a2', 'product_id': '6V7F6F', 'name': 'Mooomoo’s Marinated Kebab', 'price': 235, 'weight': 750, 'measurement': 'gm', 'category': 'Meat Poultry and Seafood', 'image': 'https://images.deliveryhero.io/image/darkstores-eg/EGY_6221235000595.JPG', 'stock': 26, '__v': 0}, {'_id': '62a5c098766f4ba646a281a6', 'product_id': 'SN6HR4', 'name': 'Mooomoo’s Rump Steak', 'price': 240, 'weight': 600, 'measurement': 'gm', 'category': 'Meat Poultry and Seafood', 'image': 'https://images.deliveryhero.io/image/darkstores-eg/EGY_6221235000663.JPG', 'stock': 5, '__v': 0}, {'_id': '62a5c098766f4ba646a281bc', 'product_id': 'YM8V89', 'name': 'Organic Red Eggs', 'price': 41.95, 'weight': 15, 'measurement': 'pcs', 'category': 'Dairy and Eggs', 'image': 'https://images.deliveryhero.io/image/product-information-management/6214a201812a30ac5d13ec52.jpg', 'stock': 11, '__v': 0}, {'_id': '62a5c098766f4ba646a281cd', 'product_id': 'Q58BHE', 'name': 'Hipro Protein Drink Strawberry', 'price': 21.25, 'weight': 260, 'measurement': 'gm', 'category': 'Dairy and Eggs', 'image': 'https://images.deliveryhero.io/image/product-information-management/621baebb1d6b10534fbfae34.jpg', 'stock': 28, '__v': 0}, {'_id': '62a5c098766f4ba646a281d5', 'product_id': '7B3WCH', 'name': 'Danone Large Plain Yoghurt', 'price': 6, 'weight': 170, 'measurement': 'gm', 'category': 'Dairy and Eggs', 'image': 'https://images.deliveryhero.io/image/talabat-nv/Kuwait/Enrichment/6223002382514.jpg', 'stock': 26, '__v': 0}, {'_id': '62a5c098766f4ba646a281ff', 'product_id': '462GMQ', 'name': 'Red Bull', 'price': 284.95, 'weight': 12, 'measurement': 'pcs', 'category': 'Beverages', 'image': 'https://images.deliveryhero.io/image/product-information-management/6118fd2fd9273e5311ccacd3.jpg', 'stock': 6, '__v': 0}, {'_id': '62a5c098766f4ba646a28215', 'product_id': 'DHKLR8', 'name': '7up', 'price': 3, 'weight': 250, 'measurement': 'ml', 'category': 'Beverages', 'image': 'https://images.deliveryhero.io/image/darkstores-eg/EGY_6223001362982.JPG', 'stock': 43, '__v': 0}, {'_id': '62a5c098766f4ba646a2822b', 'product_id': '7NLN7Z', 'name': "Temmy's Corn Flakes", 'price': 17.5, 'weight': 120, 'measurement': 'gm', 'category': 'Breakfast', 'image': 'https://images.deliveryhero.io/image/darkstores-eg/EGY_600101200060.JPG', 'stock': 21, '__v': 0}, {'_id': '62a5c098766f4ba646a2824e', 'product_id': '7H4VC2', 'name': 'Imtenan Clover Honey', 'price': 39.95, 'weight': 250, 'measurement': 'gm', 'category': 'Breakfast', 'image': 'https://images.deliveryhero.io/image/darkstores-eg/EGY_6221078011192.PNG', 'stock': 42, '__v': 0}, {'_id': '62a5c098766f4ba646a28250', 'product_id': 'IKEJXA', 'name': 'El Rashidi El Mizan Molasses', 'price': 23, 'weight': 700, 'measurement': 'gm', 'category': 'Breakfast', 'image': 'https://images.deliveryhero.io/image/darkstores-eg/EGY_6223007430531.JPG', 'stock': 37, '__v': 0}, {'_id': '62a5c098766f4ba646a2826b', 'product_id': '77VFZR', 'name': 'Siviero Maria Ice Cream Tertvo generous', 'price': 139.95, 'weight': 1, 'measurement': 'l', 'category': 'Ice Cream', 'image': 'https://images.deliveryhero.io/image/darkstores-eg/EGY_8006922010464.JPG', 'stock': 11, '__v': 0}, {'_id': '62a5c098766f4ba646a2826e', 'product_id': '9IDF4H', 'name': 'Oreo Chocolate Ice cream Sandwich ', 'price': 15, 'weight': 135, 'measurement': 'ml', 'category': 'Ice Cream', 'image': 'https://images.deliveryhero.io/image/darkstores-eg/EGY_6222020803490.JPG', 'stock': 36, '__v': 0}, {'_id': '62a5c098766f4ba646a28271', 'product_id': 'TKINUL', 'name': 'Chipsy Chili & Lemon', 'price': 5, 'weight': 83, 'measurement': 'gm', 'category': 'Chips and Crackers', 'image': 'https://images.deliveryhero.io/image/darkstores-eg/EGY_6221031490132.JPG', 'stock': 3, '__v': 0}, {'_id': '62a5c098766f4ba646a28272', 'product_id': 'M212HC', 'name': 'Chipsy Cheese', 'price': 5, 'weight': 83, 'measurement': 'gm', 'category': 'Chips and Crackers', 'image': 'https://images.deliveryhero.io/image/darkstores-eg/EGY_6221031490170.JPG', 'stock': 46, '__v': 0}, {'_id': '62a5c098766f4ba646a28299', 'product_id': 'PMPPIR', 'name': 'Cadbury Dairy Milk Hazelnut', 'price': 6, 'weight': 22, 'measurement': 'gm', 'category': 'Chocolate and Candy', 'image': 'https://images.deliveryhero.io/image/product-information-management/6242e05c72d8bc264cbb26d6.jpg', 'stock': 8, '__v': 0}, {'_id': '62a5c098766f4ba646a282a1', 'product_id': 'X3U8LP', 'name': 'Cadbury Hazelnut Chocolate', 'price': 12, 'weight': 37, 'measurement': 'g', 'category': 'Chocolate and Candy', 'image': 'https://images.deliveryhero.io/image/product-information-management/61f04a3be95dd6d63f64b939.jpg', 'stock': 13, '__v': 0}, {'_id': '62a5c098766f4ba646a282a2', 'product_id': '3DOC0O', 'name': 'CADBURY DAIRY MILK CHOCOLATE', 'price': 12, 'weight': 37, 'measurement': 'g', 'category': 'Chocolate and Candy', 'image': 'https://images.deliveryhero.io/image/product-information-management/61f04a7affeafe1f213a5c75.jpg', 'stock': 32, '__v': 0}, {'_id': '62a5c098766f4ba646a282ad', 'product_id': 'L5HF2T', 'name': 'Snickers Creamy Peanut Butter', 'price': 15, 'weight': 36.5, 'measurement': 'g', 'category': 'Chocolate and Candy', 'image': 'https://images.deliveryhero.io/image/product-information-management/622ccf2f42782a2a54fa9328.jpg', 'stock': 21, '__v': 0}, {'_id': '62a5c098766f4ba646a28290', 'product_id': '68XNM7', 'name': 'Top Of The Pop Caramel Popcorn', 'price': 18.5, 'weight': 100, 'measurement': 'gm', 'category': 'Chips and Crackers', 'image': 'https://images.deliveryhero.io/image/darkstores-eg/EGY_3800203050676.JPG', 'stock': 38, '__v': 0}, {'_id': '62a5c098766f4ba646a28292', 'product_id': '9LD36J', 'name': 'Top Of The Pop  hot pepper Popcorn', 'price': 18.5, 'weight': 100, 'measurement': 'gm', 'category': 'Chips and Crackers', 'image': 'https://images.deliveryhero.io/image/product-information-management/6204e583ec3b302f5ffbe403.jpg', 'stock': 18, '__v': 0}, {'_id': '62a5c098766f4ba646a2829e', 'product_id': '491V5Z', 'name': 'Cadbury Dairy Milk Bubbly', 'price': 12, 'weight': 40, 'measurement': 'gm', 'category': 'Chocolate and Candy', 'image': 'https://images.deliveryhero.io/image/product-information-management/6242dfdce079595dfd3d8725.jpg', 'stock': 35, '__v': 0}, {'_id': '62a5c098766f4ba646a282a7', 'product_id': '57XQS7', 'name': 'Galaxy Crispy Block Chocolate', 'price': 12, 'weight': 36, 'measurement': 'g', 'category': 'Chocolate and Candy', 'image': 'https://images.deliveryhero.io/image/product-information-management/61e93cd8cad80696f1d7cf36.jpg', 'stock': 38, '__v': 0}]
  const systemMessage = createStreamableUI(null)

  runAsyncFnWithoutBlocking(async () => {
    await sleep(1000)

    purchasing.update(
      <div className="inline-flex items-start gap-1 md:items-center">
        {spinner}
        <p className="mb-2">
          Purchasing {amount} ${symbol}... working on it...
        </p>
      </div>
    )

    await sleep(1000)

    purchasing.done(
      <div>
        <p className="mb-2">
          You have successfully purchased {amount} ${symbol}. Total cost:{' '}
          {formatNumber(amount * price)}
        </p>
      </div>
    )

    systemMessage.done(
      <SystemMessage>
        You have purchased {amount} shares of {symbol} at ${price}. Total cost ={' '}
        {formatNumber(amount * price)}.
      </SystemMessage>
    )

    aiState.done({
      ...aiState.get(),
      messages: [
        ...aiState.get().messages.slice(0, -1),
        {
          id: nanoid(),
          role: 'function',
          name: 'showStockPurchase',
          content: JSON.stringify({
            symbol,
            price,
            defaultAmount: amount,
            status: 'completed'
          })
        },
        {
          id: nanoid(),
          role: 'system',
          content: `[User has purchased ${amount} shares of ${symbol} at ${price}. Total cost = ${
            amount * price
          }]`
        }
      ]
    })
  })

  return {
    purchasingUI: purchasing.value,
    newMessage: {
      id: nanoid(),
      display: systemMessage.value
    }
  }
}

async function submitUserMessage(content: string) {
  'use server'

  const aiState = getMutableAIState<typeof AI>()

  aiState.update({
    ...aiState.get(),
    messages: [
      ...aiState.get().messages,
      {
        id: nanoid(),
        role: 'user',
        content
      }
    ]
  })

  let textStream: undefined | ReturnType<typeof createStreamableValue<string>>
  let textNode: undefined | React.ReactNode

  const ui = render({
    model: 'gpt-3.5-turbo',
    provider: openai,
    initial: <SpinnerMessage />,
    messages: [
      {
        role: 'system',
    content: `\
You are a shopping assistant chatbot for a store named terra locale, and you can help users explore products and place orders on a shopping website. You and the user can discuss product details, availability, and the user can adjust the quantity they want to purchase or directly place an order through the UI.

Messages inside [] means that it's a UI element or a user event. For example:
- '[Price of XYZ product = $25]' means that an interface showing the price of the XYZ product is displayed to the user.
- '[User has changed the quantity of XYZ product to 3]' means that the user has changed the quantity of the XYZ product to 3 in the UI.

If the user requests to purchase a product, call \`show_product_purchase_ui\` to show the purchase interface.
If the user just wants the product details, call \`show_product_details_ui\` to show the details.
If you want to show featured or trending products, call \`list_featured_products\`.
If you want to show special offers or events, call \`get_special_offers\`.
If the user wants to cancel an order or complete another task that isn't supported, respond that this is a demo and the task cannot be completed.
If the user wants to find fooducts based on a recipie help them required products for a food recipie.
    
Besides that, you can also chat with users, provide recommendations, and help with calculations if needed.
`

      },
      ...aiState.get().messages.map((message: any) => ({
        role: message.role,
        content: message.content,
        name: message.name
      }))
    ],
    text: ({ content, done, delta }) => {
      if (!textStream) {
        textStream = createStreamableValue('')
        textNode = <BotMessage content={textStream.value} />
      }

      if (done) {
        textStream.done()
        aiState.done({
          ...aiState.get(),
          messages: [
            ...aiState.get().messages,
            {
              id: nanoid(),
              role: 'assistant',
              content
            }
          ]
        })
      } else {
        textStream.update(delta)
      }

      return textNode
    },
    functions: {
      
      listStocks: {
        description: 'List three imaginary stocks that are trending.',
        parameters: z.object({
          stocks: z.array(
            z.object({
              symbol: z.string().describe('The symbol of the stock'),
              price: z.number().describe('The price of the stock'),
              delta: z.number().describe('The change in price of the stock')
            })
          )
        }),
        render: async function* ({ stocks }) {
          yield (
            <BotCard>
              <StocksSkeleton />
            </BotCard>
          )

          await sleep(1000)

          aiState.done({
            ...aiState.get(),
            messages: [
              ...aiState.get().messages,
              {
                id: nanoid(),
                role: 'function',
                name: 'listStocks',
                content: JSON.stringify(stocks)
              }
            ]
          })

          return (
            <BotCard>
              <Stocks props={stocks} />
            </BotCard>
          )
        }
      },
  listProducts: {
  description: 'List three random products from the store.',
  parameters: z.object({
    products: z.array(
      z.object({
        name: z.string().describe('The name of the product'),
        price: z.number().describe('The price of the product'),
        description: z.string().describe('The description of the product'),
        image: z.string().describe('The URL of the product image'),
        inStock: z.boolean().describe('Whether the product is in stock')
      })
    )
  }),
  render: async function* ({ products }) {
    yield (
      <BotCard>
            <div className="flex flex-col items-center gap-2 animate-pulse"> Fetching Products
      <div className="w-20 h-20 bg-gray-300 rounded-full" />
      <div className="w-32 h-4 bg-gray-300 rounded-full" />
      <div className="w-32 h-4 bg-gray-300 rounded-full" />
    </div>

      </BotCard>
    );

    await sleep(1000);
    
    const updatedProducts = await Promise.all(products.map(async product => {
      const keyword = product.name.split(' ')[0]; // Use the first word of the product name as a keyword
      const imageUrl = `https://source.unsplash.com/random?${keyword}`;
      return { ...product, image: imageUrl };
    }));
    
    aiState.done({
      ...aiState.get(),
      messages: [
        ...aiState.get().messages,
        {
          id: nanoid(),
          role: 'function',
          name: 'listProducts',
          content: JSON.stringify(products)
        }
      ]
    });

    return (
      <BotCard>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {products.map(product => (
            <div key={product.name} style={{ border: '1px solid #ccc', padding: '20px', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}>
              <img src={`https://source.unsplash.com/random?${product.name.split(' ')[1]}`} alt={product.name} style={{ width: '100%', height: '200px', objectFit: 'cover', borderRadius: '4px' }} />
              <h3>{product.name}</h3>
              <p>{product.description}</p>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontWeight: 'bold', fontSize: '18px', color: 'black', textDecoration: 'none' }}>
    ${product.price}
  </span>
                <button style={{ padding: '10px 20px', backgroundColor: '#007BFF', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
                  <a href={`http://localhost:8000/search/?search=${encodeURIComponent(product.name)}`} target="_blank" style={{ fontWeight: 'bold', fontSize: '18px', color: 'black', textDecoration: 'none' }}> {product.inStock ? 'Add to Cart' : 'Out of Stock'}</a>
                </button>
              </div>
            </div>
          ))}
        </div>
      </BotCard>
    )
  }
},findProduct: {
  description: 'Search for a specific product and display its details.',
  parameters: z.object({
    productName: z.string().describe('The name of the product to search for.')
  }),
  render: async function* ({ productName }) {
    yield (
      <BotCard>
        <div className="flex flex-col items-center gap-2 animate-pulse">Searching for Product
          <div className="w-20 h-20 bg-gray-300 rounded-full" />
          <div className="w-32 h-4 bg-gray-300 rounded-full" />
          <div className="w-32 h-4 bg-gray-300 rounded-full" />
        </div>
      </BotCard>
    );

    await sleep(1000);

    // Simulating fetching data from a local JSON file
    const data = await fetch('/data2.json').then(res => res.json());
    const product = data.products.find(p => p.name.toLowerCase() === productName.toLowerCase());

    if (!product) {
      aiState.done({
        ...aiState.get(),
        messages: [
          ...aiState.get().messages,
          {
            id: nanoid(),
            role: 'assistant',
            content: `No product found with the name "${productName}".`
          }
        ]
      });
      return <BotMessage content={`No product found with the name "${productName}".`} />
    } else {
      aiState.done({
        ...aiState.get(),
        messages: [
          ...aiState.get().messages,
          {
            id: nanoid(),
            role: 'function',
            name: 'findProduct',
            content: JSON.stringify(product)
          }
        ]
      });

      return (
        <BotCard>
          <div style={{ border: '1px solid #ccc', padding: '20px', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}>
            <img src={product.image} alt={product.name} style={{ width: '100%', height: '200px', objectFit: 'cover', borderRadius: '4px' }} />
            <h3>{product.name}</h3>
            <p>{product.description}</p>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontWeight: 'bold', fontSize: '18px', color: 'black' }}>
                ${product.price}
              </span>
              <button style={{ padding: '10px 20px', backgroundColor: '#007BFF', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
                {product.stock? 'Add to Cart' : 'Out of Stock'}
              </button>
            </div>
          </div>
        </BotCard>
      )
    }
  }
}
,
      showStockPrice: {
        description:
          'Get the current stock price of a given stock or currency. Use this to show the price to the user.',
        parameters: z.object({
          symbol: z
            .string()
            .describe(
              'The name or symbol of the stock or currency. e.g. DOGE/AAPL/USD.'
            ),
          price: z.number().describe('The price of the stock.'),
          delta: z.number().describe('The change in price of the stock')
        }),
        render: async function* ({ symbol, price, delta }) {
          yield (
            <BotCard>
              <StockSkeleton />
            </BotCard>
          )

          await sleep(1000)

          aiState.done({
            ...aiState.get(),
            messages: [
              ...aiState.get().messages,
              {
                id: nanoid(),
                role: 'function',
                name: 'showStockPrice',
                content: JSON.stringify({ symbol, price, delta })
              }
            ]
          })

          return (
            <BotCard>
              <Stock props={{ symbol, price, delta }} />
            </BotCard>
          )
        }
      },
      showStockPurchase: {
        description:
          'Show price and the UI to purchase a stock or currency. Use this if the user wants to purchase a stock or currency.',
        parameters: z.object({
          symbol: z
            .string()
            .describe(
              'The name or symbol of the stock or currency. e.g. DOGE/AAPL/USD.'
            ),
          price: z.number().describe('The price of the stock.'),
          numberOfShares: z
            .number()
            .describe(
              'The **number of shares** for a stock or currency to purchase. Can be optional if the user did not specify it.'
            )
        }),
        render: async function* ({ symbol, price, numberOfShares = 100 }) {
          if (numberOfShares <= 0 || numberOfShares > 1000) {
            aiState.done({
              ...aiState.get(),
              messages: [
                ...aiState.get().messages,
                {
                  id: nanoid(),
                  role: 'system',
                  content: `[User has selected an invalid amount]`
                }
              ]
            })

            return <BotMessage content={'Invalid amount'} />
          }

          aiState.done({
            ...aiState.get(),
            messages: [
              ...aiState.get().messages,
              {
                id: nanoid(),
                role: 'function',
                name: 'showStockPurchase',
                content: JSON.stringify({
                  symbol,
                  price,
                  numberOfShares
                })
              }
            ]
          })

          return (
            <BotCard>
              <Purchase
                props={{
                  numberOfShares,
                  symbol,
                  price: +price,
                  status: 'requires_action'
                }}
              />
            </BotCard>
          )
        }
      },
      getEvents: {
        description:
          'List funny imaginary events between user highlighted dates that describe stock activity.',
        parameters: z.object({
          events: z.array(
            z.object({
              date: z
                .string()
                .describe('The date of the event, in ISO-8601 format'),
              headline: z.string().describe('The headline of the event'),
              description: z.string().describe('The description of the event')
            })
          )
        }),
        render: async function* ({ events }) {
          yield (
            <BotCard>
              <EventsSkeleton />
            </BotCard>
          )

          await sleep(1000)

          aiState.done({
            ...aiState.get(),
            messages: [
              ...aiState.get().messages,
              {
                id: nanoid(),
                role: 'function',
                name: 'getEvents',
                content: JSON.stringify(events)
              }
            ]
          })

          return (
            <BotCard>
              <Events props={events} />
            </BotCard>
          )
        }
      }
    }
  })

  return {
    id: nanoid(),
    display: ui
  }
}

export type Message = {
  role: 'user' | 'assistant' | 'system' | 'function' | 'data' | 'tool'
  content: string
  id: string
  name?: string
}

export type AIState = {
  chatId: string
  messages: Message[]
}

export type UIState = {
  id: string
  display: React.ReactNode
}[]

export const AI = createAI<AIState, UIState>({
  actions: {
    submitUserMessage,
    confirmPurchase
  },
  initialUIState: [],
  initialAIState: { chatId: nanoid(), messages: [] },
  unstable_onGetUIState: async () => {
    'use server'

    const session = await auth()

    if (session && session.user) {
      const aiState = getAIState()

      if (aiState) {
        const uiState = getUIStateFromAIState(aiState)
        return uiState
      }
    } else {
      return
    }
  },
  unstable_onSetAIState: async ({ state, done }) => {
    'use server'

    const session = await auth()

    if (session && session.user) {
      const { chatId, messages } = state

      const createdAt = new Date()
      const userId = session.user.id as string
      const path = `/chat/${chatId}`
      const title = messages[0].content.substring(0, 100)

      const chat: Chat = {
        id: chatId,
        title,
        userId,
        createdAt,
        messages,
        path
      }

      await saveChat(chat)
    } else {
      return
    }
  }
})

export const getUIStateFromAIState = (aiState: Chat) => {
  return aiState.messages
    .filter(message => message.role !== 'system')
    .map((message, index) => ({
      id: `${aiState.chatId}-${index}`,
      display:
        message.role === 'function' ? (
          message.name === 'listStocks' ? (
            <BotCard>
              <Stocks props={JSON.parse(message.content)} />
            </BotCard>
          ) : message.name === 'showStockPrice' ? (
            <BotCard>
              <Stock props={JSON.parse(message.content)} />
            </BotCard>
          ) : message.name === 'showStockPurchase' ? (
            <BotCard>
              <Purchase props={JSON.parse(message.content)} />
            </BotCard>
          ) : message.name === 'getEvents' ? (
            <BotCard>
              <Events props={JSON.parse(message.content)} />
            </BotCard>
          ) : null
        ) : message.role === 'user' ? (
          <UserMessage>{message.content}</UserMessage>
        ) : (
          <BotMessage content={message.content} />
        )
    }))
}
