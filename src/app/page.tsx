'use client'

import { useState, useEffect } from 'react'
import { motion, type Variants } from 'framer-motion'
import {
  IconDeviceDesktop,
  IconBrain,
  IconPackage,
  IconUsers,
  IconChartBar,
  IconMapPin,
  IconCheck,
  IconX,
  IconPlayerPlay,
  IconMenu2,
  IconChevronDown,
  IconPencil,
  IconWallet,
} from '@tabler/icons-react'

// ─── Types ────────────────────────────────────────────────────────────────────

type Lang = 'ru' | 'en' | 'ua'
type IconCmp = React.ComponentType<{ size?: number; className?: string }>

interface T {
  nav_login: string
  nav_try: string
  nav_features: string
  nav_pricing: string
  hero_title: string
  hero_sub1: string
  hero_sub2: string
  hero_try: string
  hero_demo: string
  hero_owners: string
  features_title: string
  features_sub: string
  feat_pos_title: string
  feat_pos_desc: string
  feat_pos_detail: string
  feat_ai_title: string
  feat_ai_desc: string
  feat_ai_detail: string
  feat_stock_title: string
  feat_stock_desc: string
  feat_stock_detail: string
  feat_staff_title: string
  feat_staff_desc: string
  feat_staff_detail: string
  feat_analytics_title: string
  feat_analytics_desc: string
  feat_analytics_detail: string
  feat_locations_title: string
  feat_locations_desc: string
  feat_locations_detail: string
  modal_try: string
  ai_title: string
  ai_sub: string
  ai_q1: string
  ai_q2: string
  ai_q3: string
  ai_q4: string
  ai_q5: string
  ai_a1: string
  ai_a2: string
  ai_a3: string
  ai_a4: string
  ai_a5: string
  comparison_title: string
  comp_best: string
  comp_feature: string
  comp_ai: string
  comp_team: string
  comp_cashier_ai: string
  comp_dark: string
  comp_network: string
  comp_price: string
  comp_paid: string
  pricing_title: string
  pricing_sub: string
  pricing_badge: string
  pricing_month_free: string
  pricing_no_card: string
  pricing_try: string
  cta_title: string
  cta_sub: string
  cta_btn: string
  footer_product: string
  footer_company: string
  footer_features: string
  footer_pricing: string
  footer_docs: string
  footer_about: string
  footer_contact: string
  faq_title: string
  faq_q1: string
  faq_a1: string
  faq_q2: string
  faq_a2: string
  faq_q3: string
  faq_a3: string
  faq_q4: string
  faq_a4: string
  faq_q5: string
  faq_a5: string
  stats_modules: string
  stats_tests: string
  stats_ai: string
  stats_langs: string
}

// ─── Feature modal points (per language) ─────────────────────────────────────

const featurePoints: Record<Lang, Record<string, string[]>> = {
  ru: {
    pos: [
      'Drag & drop товаров в заказ',
      'Скидки % и фиксированные',
      'Сплит-оплата наличные + карта',
      'Штрихкод сканер',
      'Разделение чека между гостями',
    ],
    ai: [
      'Вопросы на человеческом языке',
      'Изменение цен голосом',
      'Статистика по кассирам',
      'Анализ склада и прогноз',
      'Добавление расходов',
    ],
    stock: [
      'Автосписание при каждой продаже',
      'Ревизия остатков',
      'Управление поставщиками',
      'Контроль сроков годности',
      'Уведомления о низком остатке',
    ],
    staff: [
      'PIN-авторизация за секунду',
      'Расчёт зарплаты автоматически',
      'Графік змін и календарь',
      'Задачи и контроль выполнения',
      'Кадровые документы',
    ],
    analytics: [
      'Выручка по часам и дням',
      'Рейтинг кассиров',
      'Прогноз на следующую неделю',
      'Топ продаваемых товаров',
      'Экспорт в Excel',
    ],
    locations: [
      'Единый аккаунт для всех точек',
      'Сравнение выручки точек',
      'Карта заведений',
      'Перенос товаров между точками',
      'Общая аналитика сети',
    ],
  },
  en: {
    pos: [
      'Drag & drop items into order',
      'Percentage & fixed discounts',
      'Split payment cash + card',
      'Barcode scanner support',
      'Split bill between guests',
    ],
    ai: [
      'Natural language questions',
      'Update prices by command',
      'Cashier performance stats',
      'Stock analysis & forecast',
      'Add expenses instantly',
    ],
    stock: [
      'Auto-updates stock on every sale',
      'Inventory audits',
      'Supplier management',
      'Expiry date tracking',
      'Low stock alerts',
    ],
    staff: [
      'PIN login in one second',
      'Automatic payroll calculation',
      'Shift calendar & scheduling',
      'Tasks & completion tracking',
      'Employee documents',
    ],
    analytics: [
      'Revenue by hour and day',
      'Cashier performance rankings',
      'Weekly sales forecast',
      'Top-selling products',
      'Excel export',
    ],
    locations: [
      'One account for all venues',
      'Compare location performance',
      'Venue map',
      'Transfer stock between locations',
      'Network-wide analytics',
    ],
  },
  ua: {
    pos: [
      'Drag & drop товарів в замовлення',
      'Знижки % та фіксовані',
      'Спліт-оплата готівка + картка',
      'Підтримка сканера штрихкодів',
      'Розділення чека між гостями',
    ],
    ai: [
      'Запитання людською мовою',
      'Зміна цін через команду',
      'Статистика по касирах',
      'Аналіз складу та прогноз',
      'Додавання витрат',
    ],
    stock: [
      'Автосписання при кожному продажу',
      'Ревізія залишків',
      'Управління постачальниками',
      'Контроль термінів придатності',
      'Сповіщення про низький залишок',
    ],
    staff: [
      'PIN-авторизація за секунду',
      'Автоматичний розрахунок зарплати',
      'Графік змін та календар',
      'Завдання та контроль виконання',
      'Кадрові документи',
    ],
    analytics: [
      'Виручка за годинами та днями',
      'Рейтинг касирів',
      'Прогноз на наступний тиждень',
      'Топ товарів за продажами',
      'Експорт в Excel',
    ],
    locations: [
      'Єдиний акаунт для всіх точок',
      'Порівняння виручки точок',
      'Карта закладів',
      'Переміщення товарів між точками',
      'Загальна аналітика мережі',
    ],
  },
}

// ─── Pricing features list ────────────────────────────────────────────────────

const pricingFeatures: Record<Lang, string[]> = {
  ru: [
    'Безлимит касс и точек',
    'Nuclear AI (полный доступ)',
    'Склад и ревизия',
    'Зарплатный модуль',
    'Сроки годности',
    'Принтер чеков',
    'Аналитика + экспорт Excel',
    'Приоритетная поддержка',
  ],
  en: [
    'Unlimited POS & locations',
    'Nuclear AI (full access)',
    'Inventory & audit',
    'Payroll module',
    'Expiry tracking',
    'Receipt printer',
    'Analytics + Excel export',
    'Priority support',
  ],
  ua: [
    'Безліміт кас і точок',
    'Nuclear AI (повний доступ)',
    'Склад і ревізія',
    'Зарплатний модуль',
    'Терміни придатності',
    'Принтер чеків',
    'Аналітика + експорт Excel',
    'Пріоритетна підтримка',
  ],
}

// ─── Translations ─────────────────────────────────────────────────────────────

const translations: Record<Lang, T> = {
  ru: {
    nav_login: 'Войти',
    nav_try: 'Попробовать →',
    nav_features: 'Функции',
    nav_pricing: 'Тарифы',
    hero_title: 'Операционная система\nдля вашего бизнеса',
    hero_sub1: 'Касса · Склад · Персонал · AI-аналитика',
    hero_sub2: 'Всё что нужно — в одном месте',
    hero_try: 'Начать бесплатно',
    hero_demo: 'Смотреть демо',
    hero_owners: 'Уже доверяют владельцы бизнеса',
    features_title: 'Всё что нужно для бизнеса',
    features_sub: 'Один продукт вместо пяти разных инструментов',
    feat_pos_title: 'Умная касса',
    feat_pos_desc: 'Drag & drop, скидки, сплит-оплата, штрихкоды. Кассир обучится за 5 минут',
    feat_pos_detail: 'Интуитивный интерфейс кассы с поддержкой любых сценариев оплаты. Обучение кассира занимает не более 15 минут.',
    feat_ai_title: 'Nuclear AI',
    feat_ai_desc: 'Спросите на человеческом языке — AI ответит за 1 секунду с реальными данными',
    feat_ai_detail: 'Встроенный AI-ассистент понимает вопросы о вашем бизнесе и умеет изменять данные прямо из чата.',
    feat_stock_title: 'Склад и учёт',
    feat_stock_desc: 'Автосписание при продаже, ревизия, поставщики, сроки годности',
    feat_stock_detail: 'Полный контроль над складом в реальном времени. Никаких пересчётов вручную — всё происходит автоматически.',
    feat_staff_title: 'Персонал',
    feat_staff_desc: 'PIN-авторизация, зарплаты, графік змін, задачи и документы персонала',
    feat_staff_detail: 'Управляйте командой полностью в одном месте: от расписания до расчёта зарплаты.',
    feat_analytics_title: 'Аналитика',
    feat_analytics_desc: 'Выручка за часам, дням, кассирам. Прогноз на неделю. Экспорт в Excel',
    feat_analytics_detail: 'Глубокая аналитика без настройки. Данные обновляются в реальном времени, прогнозы строятся автоматически.',
    feat_locations_title: 'Сеть точек',
    feat_locations_desc: 'Управляйте несколькими заведениями из одного аккаунта. Карта точек включена',
    feat_locations_detail: 'Один аккаунт — все точки. Сравнивайте выручку, переносите товары, смотрите карту.',
    modal_try: 'Попробовать бесплатно →',
    ai_title: 'Nuclear AI знает ваш бизнес',
    ai_sub: 'Спросите на человеческом языке — получите реальные данные',
    ai_q1: 'сколько заработали сегодня?',
    ai_q2: 'поменяй цену АПА на $3.5',
    ai_q3: 'кто лучший кассир за неделю?',
    ai_q4: 'что скоро закончится на складе?',
    ai_q5: 'добавь расход аренда $500',
    ai_a1: 'Выручка: $1 240 · 47 чеков · средний чек $26\nЛучший час: 19:00–20:00 ($184)',
    ai_a2: '✅ Цена АПА изменена: $2.8 → $3.5\nИзменение применено ко всем точкам.',
    ai_a3: 'Иван — $1 240 выручки · 89 чеков\nСредний чек $14 · Смена 8 ч',
    ai_a4: '⚠️ АПА 0.5л — 3 шт (хватит на ~2 дня)\n⚠️ Чипсы Lays — 5 шт',
    ai_a5: '✅ Расход добавлен: Аренда $500\nТекущий баланс обновлён.',
    comparison_title: 'Nuclear OS vs конкуренты',
    comp_best: 'Лучший выбор',
    comp_feature: 'Функция',
    comp_ai: 'AI-ассистент',
    comp_team: 'Управление командой',
    comp_cashier_ai: 'Помощник кассира',
    comp_dark: 'Тёмная тема',
    comp_network: 'Сеть точек в тарифе',
    comp_price: 'Цена/мес',
    comp_paid: 'Платно',
    pricing_title: 'Один тариф — всё включено',
    pricing_sub: 'Никаких сюрпризов. Первый месяц — бесплатно.',
    pricing_badge: 'Всё включено',
    pricing_month_free: '/ месяц · первый месяц бесплатно',
    pricing_no_card: 'Без привязки карты · Отмена в любое время',
    pricing_try: 'Начать бесплатно →',
    cta_title: 'Готовы запустить Nuclear OS?',
    cta_sub: 'Первый месяц бесплатно',
    cta_btn: 'Попробовать бесплатно',
    footer_product: 'Продукт',
    footer_company: 'Компания',
    footer_features: 'Функции',
    footer_pricing: 'Тарифы',
    footer_docs: 'Документация',
    footer_about: 'О нас',
    footer_contact: 'Контакты',
    faq_title: 'Часто задаваемые вопросы',
    faq_q1: 'Нужно ли специальное оборудование?',
    faq_a1: 'Нет — достаточно любого планшета или ноутбука. Принтер чеков подключается по необходимости.',
    faq_q2: 'Как быстро можно начать?',
    faq_a2: 'Регистрация занимает 2 минуты. Первую продажу можно провести через 15 минут после входа.',
    faq_q3: 'Есть ли бесплатный период?',
    faq_a3: 'Да — первый месяц бесплатно без ограничений функционала.',
    faq_q4: 'Что такое Nuclear AI?',
    faq_a4: 'Встроенный AI-ассистент, который отвечает на вопросы о вашем бизнесе и может управлять системой через текстовые команды.',
    faq_q5: 'Можно ли управлять несколькими точками?',
    faq_a5: 'Да — все тарифы включают мультиточковость. Дополнительная плата не нужна.',
    stats_modules: 'модулей системы',
    stats_tests: 'тестов пройдено',
    stats_ai: 'ответ AI',
    stats_langs: 'языка интерфейса',
  },

  en: {
    nav_login: 'Sign In',
    nav_try: 'Try Free →',
    nav_features: 'Features',
    nav_pricing: 'Pricing',
    hero_title: 'The Operating System\nfor Your Business',
    hero_sub1: 'POS · Inventory · Staff · AI Analytics',
    hero_sub2: 'Everything you need — in one place',
    hero_try: 'Start for free',
    hero_demo: 'Watch demo',
    hero_owners: 'Trusted by business owners',
    features_title: 'Everything your business needs',
    features_sub: 'One product instead of five different tools',
    feat_pos_title: 'Smart POS',
    feat_pos_desc: 'Drag & drop, discounts, split payment, barcodes. Cashier learns in 5 minutes',
    feat_pos_detail: 'Intuitive POS interface built for any payment scenario. Staff onboarding takes under 15 minutes.',
    feat_ai_title: 'Nuclear AI',
    feat_ai_desc: 'Ask in plain language — AI answers in 1 second with real data',
    feat_ai_detail: 'A built-in AI assistant that understands your business and can update data directly from chat.',
    feat_stock_title: 'Inventory',
    feat_stock_desc: 'Stock auto-updates on every sale. Audits, suppliers, and expiry tracking built in.',
    feat_stock_detail: 'Full real-time inventory control. No manual recounts — everything updates automatically on every sale.',
    feat_staff_title: 'Staff',
    feat_staff_desc: 'PIN login, payroll, shift scheduling, tasks, and employee documents',
    feat_staff_detail: 'Manage your entire team in one place: from scheduling to payroll calculation.',
    feat_analytics_title: 'Analytics',
    feat_analytics_desc: 'Revenue by hour, day, cashier. Weekly forecast. Excel export',
    feat_analytics_detail: 'Deep analytics with no setup required. Data updates in real time, forecasts are built automatically.',
    feat_locations_title: 'Multi-location',
    feat_locations_desc: 'Manage multiple venues from one account. Location map included',
    feat_locations_detail: 'One account for all venues. Compare revenue, transfer stock, and view your location map.',
    modal_try: 'Try for free →',
    ai_title: 'Nuclear AI knows your business',
    ai_sub: 'Ask in plain language — get real data instantly',
    ai_q1: 'how much did we earn today?',
    ai_q2: 'change APA price to $3.5',
    ai_q3: 'who was the best cashier this week?',
    ai_q4: 'what is running low in stock?',
    ai_q5: 'add expense: rent $500',
    ai_a1: 'Revenue: $1,240 · 47 receipts · avg $26\nBest hour: 19:00–20:00 ($184)',
    ai_a2: '✅ APA price updated: $2.8 → $3.5\nChange applied across all locations.',
    ai_a3: 'Ivan — $1,240 revenue · 89 receipts\nAvg check $14 · 8h shift',
    ai_a4: '⚠️ APA 0.5L — 3 left (~2 days)\n⚠️ Lays chips — 5 left',
    ai_a5: '✅ Expense added: Rent $500\nBalance has been updated.',
    comparison_title: 'Nuclear OS vs competitors',
    comp_best: 'Best choice',
    comp_feature: 'Feature',
    comp_ai: 'AI assistant',
    comp_team: 'Team management',
    comp_cashier_ai: 'Cashier AI',
    comp_dark: 'Dark theme',
    comp_network: 'Multi-location in plan',
    comp_price: 'Price/mo',
    comp_paid: 'Paid',
    pricing_title: 'One plan — everything included',
    pricing_sub: 'No surprises. First month is on us.',
    pricing_badge: 'All-inclusive',
    pricing_month_free: '/ month · first month free',
    pricing_no_card: 'No credit card · Cancel anytime',
    pricing_try: 'Start for free →',
    cta_title: 'Ready to launch Nuclear OS?',
    cta_sub: 'First month free',
    cta_btn: 'Try for free',
    footer_product: 'Product',
    footer_company: 'Company',
    footer_features: 'Features',
    footer_pricing: 'Pricing',
    footer_docs: 'Documentation',
    footer_about: 'About',
    footer_contact: 'Contact',
    faq_title: 'Frequently asked questions',
    faq_q1: 'Do I need special hardware?',
    faq_a1: 'No — any tablet or laptop works. Receipt printer connects when needed.',
    faq_q2: 'How quickly can I get up and running?',
    faq_a2: 'Takes 2 minutes to sign up. You can ring up your first sale within 15 minutes of logging in.',
    faq_q3: 'Is there a free trial?',
    faq_a3: 'Yes — first month free with no feature limitations.',
    faq_q4: 'What is Nuclear AI?',
    faq_a4: 'A built-in AI assistant that answers questions about your business and can manage the system via text commands.',
    faq_q5: 'Can I manage multiple locations?',
    faq_a5: 'Yes — all plans include multi-location support. No extra charge.',
    stats_modules: 'system modules',
    stats_tests: 'tests passed',
    stats_ai: 'AI response',
    stats_langs: 'UI languages',
  },

  ua: {
    nav_login: 'Увійти',
    nav_try: 'Спробувати →',
    nav_features: 'Функції',
    nav_pricing: 'Тарифи',
    hero_title: 'Операційна система\nдля вашого бізнесу',
    hero_sub1: 'Каса · Склад · Персонал · AI-аналітика',
    hero_sub2: 'Все що потрібно — в одному місці',
    hero_try: 'Почати безкоштовно',
    hero_demo: 'Дивитись демо',
    hero_owners: 'Вже обрали власники бізнесу',
    features_title: 'Все що потрібно для бізнесу',
    features_sub: "Один продукт замість п'яти різних інструментів",
    feat_pos_title: 'Розумна каса',
    feat_pos_desc: 'Drag & drop, знижки, спліт-оплата, штрихкоди. Касир навчиться за 5 хвилин',
    feat_pos_detail: 'Інтуїтивний інтерфейс каси для будь-яких сценаріїв оплати. Навчання касира займає не більше 15 хвилин.',
    feat_ai_title: 'Nuclear AI',
    feat_ai_desc: 'Запитайте людською мовою — AI відповість за 1 секунду з реальними даними',
    feat_ai_detail: 'Вбудований AI-асистент, який розуміє ваш бізнес і може змінювати дані прямо з чату.',
    feat_stock_title: 'Склад і облік',
    feat_stock_desc: 'Автосписання при продажу, ревізія, постачальники, терміни придатності',
    feat_stock_detail: 'Повний контроль складу в реальному часі. Жодних ручних перерахунків — все відбувається автоматично.',
    feat_staff_title: 'Персонал',
    feat_staff_desc: 'PIN-авторизація, зарплати, графік змін, завдання та документи персоналу',
    feat_staff_detail: 'Керуйте командою повністю в одному місці: від розкладу до розрахунку зарплати.',
    feat_analytics_title: 'Аналітика',
    feat_analytics_desc: 'Виручка за годинами, днями, касирами. Прогноз на тиждень. Експорт в Excel',
    feat_analytics_detail: 'Глибока аналітика без налаштувань. Дані оновлюються в реальному часі, прогнози будуються автоматично.',
    feat_locations_title: 'Мережа точок',
    feat_locations_desc: 'Керуйте кількома закладами з одного акаунту. Карта точок включена',
    feat_locations_detail: 'Один акаунт — всі точки. Порівнюйте виручку, переміщуйте товари, дивіться карту.',
    modal_try: 'Спробувати безкоштовно →',
    ai_title: 'Nuclear AI знає ваш бізнес',
    ai_sub: 'Запитайте людською мовою — отримайте реальні дані',
    ai_q1: 'скільки заробили сьогодні?',
    ai_q2: 'зміни ціну АПА на $3.5',
    ai_q3: 'хто найкращий касир за тиждень?',
    ai_q4: 'що скоро закінчиться на складі?',
    ai_q5: 'додай витрату оренда $500',
    ai_a1: 'Виручка: $1 240 · 47 чеків · середній $26\nНайкраща година: 19:00–20:00 ($184)',
    ai_a2: '✅ Ціна АПА змінена: $2.8 → $3.5\nЗміна застосована до всіх точок.',
    ai_a3: 'Іван — $1 240 виручки · 89 чеків\nСередній чек $14 · Зміна 8 год',
    ai_a4: '⚠️ АПА 0.5л — 3 шт (~2 дні)\n⚠️ Чіпси Lays — 5 шт',
    ai_a5: '✅ Витрату додано: Оренда $500\nПоточний баланс оновлено.',
    comparison_title: 'Nuclear OS vs конкуренти',
    comp_best: 'Найкращий вибір',
    comp_feature: 'Функція',
    comp_ai: 'AI-асистент',
    comp_team: 'Управління командою',
    comp_cashier_ai: 'Помічник касира',
    comp_dark: 'Темна тема',
    comp_network: 'Мережа точок у тарифі',
    comp_price: 'Ціна/міс',
    comp_paid: 'Платно',
    pricing_title: 'Один тариф — все включено',
    pricing_sub: 'Жодних сюрпризів. Перший місяць — безкоштовно.',
    pricing_badge: 'Все включено',
    pricing_month_free: '/ місяць · перший місяць безкоштовно',
    pricing_no_card: "Без прив'язки картки · Скасування в будь-який час",
    pricing_try: 'Почати безкоштовно →',
    cta_title: 'Готові запустити Nuclear OS?',
    cta_sub: 'Перший місяць безкоштовно',
    cta_btn: 'Спробувати безкоштовно',
    footer_product: 'Продукт',
    footer_company: 'Компанія',
    footer_features: 'Функції',
    footer_pricing: 'Тарифи',
    footer_docs: 'Документація',
    footer_about: 'Про нас',
    footer_contact: 'Контакти',
    faq_title: 'Часті запитання',
    faq_q1: 'Чи потрібне обладнання?',
    faq_a1: 'Ні — достатньо будь-якого планшета або ноутбука. Принтер чеків підключається за потреби.',
    faq_q2: 'Як швидко можна почати?',
    faq_a2: 'Реєстрація займає 2 хвилини. Перший продаж можна провести через 15 хвилин після входу.',
    faq_q3: 'Чи є безкоштовний період?',
    faq_a3: 'Так — перший місяць безкоштовно без обмежень функціоналу.',
    faq_q4: 'Що таке Nuclear AI?',
    faq_a4: 'Вбудований AI-асистент, який відповідає на питання про ваш бізнес і може керувати системою через текстові команди.',
    faq_q5: 'Чи можна керувати кількома точками?',
    faq_a5: 'Так — всі тарифи включають роботу з кількома точками без доплати.',
    stats_modules: 'модулів системи',
    stats_tests: 'тестів пройдено',
    stats_ai: 'відповідь AI',
    stats_langs: 'мови інтерфейсу',
  },
}

// ─── Motion variants ──────────────────────────────────────────────────────────

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
}

const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
}

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5 },
  }),
}

// ─── Navbar ───────────────────────────────────────────────────────────────────

function Navbar({
  lang,
  setLang,
  t,
}: {
  lang: Lang
  setLang: (l: Lang) => void
  t: T
}) {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-[#1e1e1e] bg-[#060809]/90 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <span className="text-white font-bold text-lg tracking-tight flex-shrink-0">
          <span className="text-orange-500">NUCLEAR</span> OS
        </span>

        <div className="hidden md:flex items-center gap-6 text-sm text-gray-400">
          <a href="#features" className="hover:text-white transition-colors">{t.nav_features}</a>
          <a href="#pricing" className="hover:text-white transition-colors">{t.nav_pricing}</a>
        </div>

        <div className="hidden md:flex items-center gap-1 bg-[#0f0f0f] border border-[#1e1e1e] rounded-lg p-1">
          {(['ru', 'en', 'ua'] as Lang[]).map((l) => (
            <button
              key={l}
              onClick={() => setLang(l)}
              className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                lang === l ? 'bg-orange-500 text-white' : 'text-gray-400 hover:text-white'
              }`}
            >
              {l.toUpperCase()}
            </button>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-3">
          <button className="text-gray-400 hover:text-white text-sm transition-colors">
            {t.nav_login}
          </button>
          <button className="bg-orange-500 hover:bg-orange-400 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors">
            {t.nav_try}
          </button>
        </div>

        <button
          className="md:hidden text-gray-400 hover:text-white transition-colors"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <IconX size={22} /> : <IconMenu2 size={22} />}
        </button>
      </div>

      {menuOpen && (
        <div className="md:hidden border-t border-[#1e1e1e] bg-[#0f0f0f] px-6 py-5 flex flex-col gap-4">
          <div className="flex gap-1 bg-[#161616] border border-[#1e1e1e] rounded-lg p-1 w-fit">
            {(['ru', 'en', 'ua'] as Lang[]).map((l) => (
              <button
                key={l}
                onClick={() => { setLang(l); setMenuOpen(false) }}
                className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                  lang === l ? 'bg-orange-500 text-white' : 'text-gray-400'
                }`}
              >
                {l.toUpperCase()}
              </button>
            ))}
          </div>
          <a href="#features" onClick={() => setMenuOpen(false)} className="text-gray-300 hover:text-white text-sm">{t.nav_features}</a>
          <a href="#pricing" onClick={() => setMenuOpen(false)} className="text-gray-300 hover:text-white text-sm">{t.nav_pricing}</a>
          <button className="text-gray-400 text-sm text-left">{t.nav_login}</button>
          <button className="bg-orange-500 text-white rounded-xl py-2.5 font-semibold text-sm">
            {t.hero_try} →
          </button>
        </div>
      )}
    </nav>
  )
}

// ─── Hero ─────────────────────────────────────────────────────────────────────

function Hero({ t }: { t: T }) {
  const avatars = ['ИВ', 'СА', 'МП', 'ОК']

  return (
    <section className="relative gradient-hero pt-32 pb-24 px-6 text-center overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full bg-orange-500/10 blur-[120px] pointer-events-none" />

      <motion.div initial="hidden" animate="visible" variants={stagger} className="relative max-w-4xl mx-auto">
        <motion.div variants={fadeUp} className="inline-flex items-center gap-2 bg-orange-500/10 border border-orange-500/20 text-orange-400 text-sm px-4 py-1.5 rounded-full mb-8">
          <span className="w-1.5 h-1.5 bg-orange-500 rounded-full animate-pulse" />
          nuclear-os.com · v1.0
        </motion.div>

        <motion.h1 variants={fadeUp} className="text-6xl sm:text-7xl font-bold text-white leading-tight tracking-tight mb-6">
          {t.hero_title.split('\n').map((line, i) => (
            <span key={i}>{i > 0 && <br />}{line}</span>
          ))}
        </motion.h1>

        <motion.p variants={fadeUp} className="text-xl text-gray-400 mb-2">{t.hero_sub1}</motion.p>
        <motion.p variants={fadeUp} className="text-lg text-gray-500 mb-10">{t.hero_sub2}</motion.p>

        <motion.div variants={fadeUp} className="flex flex-wrap items-center justify-center gap-4 mb-8">
          <button className="relative px-8 py-4 bg-orange-500 rounded-xl text-white font-semibold text-lg overflow-hidden group shadow-lg shadow-orange-500/25">
            <span className="relative z-10">{t.hero_try} →</span>
            <div className="absolute inset-0 bg-gradient-to-r from-orange-600 to-orange-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </button>
          <button className="flex items-center gap-2 bg-[#0f0f0f] hover:bg-[#161616] border border-[#1e1e1e] text-white font-medium px-6 py-4 rounded-xl text-base transition-colors">
            <IconPlayerPlay size={16} className="text-orange-500" />
            {t.hero_demo}
          </button>
        </motion.div>

        <motion.div variants={fadeUp} className="flex items-center justify-center gap-4 text-gray-500 text-sm">
          <div className="flex -space-x-2">
            {avatars.map((init, i) => (
              <div key={i} className="w-8 h-8 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 border-2 border-[#060809] flex items-center justify-center text-white text-xs font-bold">
                {init}
              </div>
            ))}
          </div>
          <span>{t.hero_owners}</span>
          <div className="flex gap-0.5">
            {[1, 2, 3, 4, 5].map((i) => <span key={i} className="text-orange-400 text-xs">★</span>)}
          </div>
        </motion.div>
      </motion.div>
    </section>
  )
}

// ─── Marquee ──────────────────────────────────────────────────────────────────

const marqueeItems = [
  'POS', 'Склад', 'AI', 'Зарплати', 'Терміни придатності',
  'Аналітика', 'Принтер чеків', 'Клієнти', 'Мережа точок', 'Зміни',
]

function MarqueeTicker() {
  const items = [...marqueeItems, ...marqueeItems]
  return (
    <div className="border-y border-[#1e1e1e] py-4 overflow-hidden bg-[#0a0a0a]">
      <div className="flex animate-marquee whitespace-nowrap">
        {items.map((item, i) => (
          <span key={i} className="mx-8 text-sm text-gray-500 font-medium tracking-widest uppercase">
            {item}<span className="ml-8 text-orange-500/40">·</span>
          </span>
        ))}
      </div>
    </div>
  )
}

// ─── Stats ────────────────────────────────────────────────────────────────────

function Stats({ t }: { t: T }) {
  const stats = [
    { value: '10+', label: t.stats_modules },
    { value: '59/59', label: t.stats_tests },
    { value: '<1с', label: t.stats_ai },
    { value: '3', label: t.stats_langs },
  ]

  return (
    <section className="border-b border-[#1e1e1e] py-12 px-6">
      <motion.div
        initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}
        className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto"
      >
        {stats.map((s) => (
          <motion.div key={s.label} variants={fadeUp} className="text-center">
            <div className="text-4xl font-bold text-orange-500 mb-1">{s.value}</div>
            <div className="text-gray-500 text-sm">{s.label}</div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  )
}

// ─── Features with modal ──────────────────────────────────────────────────────

interface FeatureDetail {
  key: string
  Icon: IconCmp
  title: string
  desc: string
  detail: string
  points: string[]
}

function Features({ t, lang }: { t: T; lang: Lang }) {
  const [selected, setSelected] = useState<FeatureDetail | null>(null)

  const features: FeatureDetail[] = [
    { key: 'pos',       Icon: IconDeviceDesktop, title: t.feat_pos_title,       desc: t.feat_pos_desc,       detail: t.feat_pos_detail,       points: featurePoints[lang].pos },
    { key: 'ai',        Icon: IconBrain,          title: t.feat_ai_title,        desc: t.feat_ai_desc,        detail: t.feat_ai_detail,        points: featurePoints[lang].ai },
    { key: 'stock',     Icon: IconPackage,        title: t.feat_stock_title,     desc: t.feat_stock_desc,     detail: t.feat_stock_detail,     points: featurePoints[lang].stock },
    { key: 'staff',     Icon: IconUsers,          title: t.feat_staff_title,     desc: t.feat_staff_desc,     detail: t.feat_staff_detail,     points: featurePoints[lang].staff },
    { key: 'analytics', Icon: IconChartBar,       title: t.feat_analytics_title, desc: t.feat_analytics_desc, detail: t.feat_analytics_detail, points: featurePoints[lang].analytics },
    { key: 'locations', Icon: IconMapPin,         title: t.feat_locations_title, desc: t.feat_locations_desc, detail: t.feat_locations_detail, points: featurePoints[lang].locations },
  ]

  return (
    <section id="features" className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }} variants={fadeUp}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-white mb-4">{t.features_title}</h2>
          <p className="text-gray-500 text-lg">{t.features_sub}</p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {features.map(({ Icon, title, desc, key }, i) => (
            <motion.div
              key={key}
              custom={i}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-40px' }}
              onClick={() => setSelected(features[i])}
              className="bg-[#0f0f0f] border border-[#1e1e1e] rounded-2xl p-6 hover:border-orange-500/30 transition-colors duration-300 group cursor-pointer"
            >
              <Icon size={28} className="text-orange-500 mb-4 group-hover:scale-110 transition-transform duration-300" />
              <h3 className="text-white font-semibold text-lg mb-2">{title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
              <span className="mt-4 inline-flex items-center gap-1 text-orange-500 text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                Подробнее →
              </span>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Modal */}
      {selected && (
        <div
          className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setSelected(null)}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.2 }}
            className="bg-[#0f0f0f] border border-[#1e1e1e] rounded-2xl p-6 max-w-md w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <selected.Icon size={24} className="text-orange-500" />
                <h3 className="text-white font-semibold text-lg">{selected.title}</h3>
              </div>
              <button onClick={() => setSelected(null)} className="text-gray-500 hover:text-white transition-colors">
                <IconX size={20} />
              </button>
            </div>

            <p className="text-gray-400 text-sm mb-5 leading-relaxed">{selected.detail}</p>

            <div className="space-y-2.5 mb-6">
              {selected.points.map((p) => (
                <div key={p} className="flex items-center gap-2.5 text-sm text-gray-300">
                  <IconCheck size={14} className="text-orange-500 flex-shrink-0" />
                  {p}
                </div>
              ))}
            </div>

            <button className="w-full bg-orange-500 hover:bg-orange-400 text-white rounded-xl py-2.5 text-sm font-semibold transition-colors">
              {t.modal_try}
            </button>
          </motion.div>
        </div>
      )}
    </section>
  )
}

// ─── AI Showcase — rotating examples ─────────────────────────────────────────

interface AIExample {
  q: string
  a: string
  Icon: IconCmp
}

function AIShowcase({ t }: { t: T }) {
  const [active, setActive] = useState(0)

  const examples: AIExample[] = [
    { q: t.ai_q1, a: t.ai_a1, Icon: IconChartBar },
    { q: t.ai_q2, a: t.ai_a2, Icon: IconPencil },
    { q: t.ai_q3, a: t.ai_a3, Icon: IconUsers },
    { q: t.ai_q4, a: t.ai_a4, Icon: IconPackage },
    { q: t.ai_q5, a: t.ai_a5, Icon: IconWallet },
  ]

  useEffect(() => {
    const timer = setInterval(() => {
      setActive((prev) => (prev + 1) % examples.length)
    }, 4000)
    return () => clearInterval(timer)
  }, [examples.length])

  const current = examples[active]

  return (
    <section className="gradient-ai py-24 px-6">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
        {/* Left */}
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
          <motion.h2 variants={fadeUp} className="text-4xl font-bold text-white mb-4">{t.ai_title}</motion.h2>
          <motion.p variants={fadeUp} className="text-gray-400 text-lg mb-8">{t.ai_sub}</motion.p>

          <motion.div variants={stagger} className="space-y-2">
            {examples.map(({ q, Icon }, i) => (
              <motion.button
                key={i}
                variants={fadeUp}
                onClick={() => setActive(i)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all duration-200 ${
                  i === active
                    ? 'bg-orange-500/15 border border-orange-500/30 text-orange-200'
                    : 'bg-[#0f0f0f] border border-[#1e1e1e] text-gray-400 hover:border-[#2a2a2a]'
                }`}
              >
                <Icon size={16} className={i === active ? 'text-orange-400' : 'text-gray-600'} />
                <span className="font-mono text-sm">{q}</span>
              </motion.button>
            ))}
          </motion.div>
        </motion.div>

        {/* Right — chat UI */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-[#0a0a0a] border border-[#1e1e1e] rounded-2xl p-6 max-w-md mx-auto w-full"
        >
          {/* Header */}
          <div className="flex items-center gap-2 mb-5 pb-4 border-b border-[#1e1e1e]">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span className="text-xs text-gray-500">Nuclear AI · Online</span>
          </div>

          {/* Question */}
          <motion.div
            key={`q-${active}`}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="flex justify-end mb-4"
          >
            <div className="bg-orange-500 text-white rounded-2xl rounded-tr-sm px-4 py-2.5 text-sm max-w-[80%]">
              {current.q}
            </div>
          </motion.div>

          {/* Answer */}
          <motion.div
            key={`a-${active}`}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.15 }}
            className="flex gap-3 mb-5"
          >
            <div className="w-7 h-7 rounded-full bg-orange-500/20 border border-orange-500/30 flex items-center justify-center flex-shrink-0 mt-0.5">
              <current.Icon size={13} className="text-orange-400" />
            </div>
            <div className="bg-[#1a1a1a] text-gray-200 rounded-2xl rounded-tl-sm px-4 py-3 text-sm max-w-[80%] whitespace-pre-line leading-relaxed">
              {current.a}
            </div>
          </motion.div>

          {/* Dot indicators */}
          <div className="flex justify-center gap-1.5">
            {examples.map((_, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                className={`h-1.5 rounded-full cursor-pointer transition-all duration-300 ${
                  i === active ? 'bg-orange-500 w-4' : 'bg-[#2a2a2a] w-1.5'
                }`}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

// ─── Comparison ───────────────────────────────────────────────────────────────

type Cell = boolean | string

function Comparison({ t }: { t: T }) {
  const rows: { label: string; nuclear: Cell; poster: Cell; sky: Cell }[] = [
    { label: t.comp_ai,         nuclear: true,        poster: false,       sky: false },
    { label: t.comp_team,       nuclear: true,        poster: false,       sky: false },
    { label: t.comp_cashier_ai, nuclear: true,        poster: false,       sky: false },
    { label: t.comp_dark,       nuclear: true,        poster: false,       sky: false },
    { label: t.comp_network,    nuclear: '✓',         poster: t.comp_paid, sky: t.comp_paid },
    { label: t.comp_price,      nuclear: 'від $23',   poster: 'від $16',   sky: 'від $8' },
  ]

  function renderCell(v: Cell, isNuclear = false) {
    if (v === true)  return <IconCheck size={18} className={`mx-auto ${isNuclear ? 'text-orange-500' : 'text-green-500'}`} />
    if (v === false) return <IconX size={18} className="mx-auto text-gray-700" />
    return <span className={`text-sm ${isNuclear ? 'text-orange-400 font-semibold' : 'text-gray-400'}`}>{v}</span>
  }

  return (
    <section className="py-24 px-6">
      <div className="max-w-4xl mx-auto">
        <motion.h2
          initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
          className="text-4xl font-bold text-white text-center mb-12"
        >
          {t.comparison_title}
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="overflow-hidden rounded-2xl border border-[#1e1e1e]"
        >
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#1e1e1e]">
                <th className="text-left text-gray-500 text-sm font-medium px-6 py-4 bg-[#0a0a0a]">{t.comp_feature}</th>
                <th className="text-center px-6 py-4 bg-orange-500/10 border-x border-orange-500/30 relative">
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-orange-500 text-white text-[10px] font-semibold px-3 py-0.5 rounded-full whitespace-nowrap">
                    {t.comp_best}
                  </div>
                  <span className="text-orange-400 text-sm font-bold">Nuclear OS</span>
                </th>
                <th className="text-center text-gray-400 text-sm font-medium px-6 py-4 bg-[#0a0a0a]">Poster</th>
                <th className="text-center text-gray-400 text-sm font-medium px-6 py-4 bg-[#0a0a0a]">SkyService</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, i) => (
                <tr key={i} className="border-b border-[#1e1e1e] last:border-0 hover:bg-white/[0.02] transition-colors">
                  <td className="text-gray-300 text-sm px-6 py-4">{row.label}</td>
                  <td className="text-center px-6 py-4 bg-orange-500/5 border-x border-orange-500/20">{renderCell(row.nuclear, true)}</td>
                  <td className="text-center px-6 py-4">{renderCell(row.poster)}</td>
                  <td className="text-center px-6 py-4">{renderCell(row.sky)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </motion.div>
      </div>
    </section>
  )
}

// ─── Pricing — single plan ────────────────────────────────────────────────────

function Pricing({ t, lang }: { t: T; lang: Lang }) {
  const features = pricingFeatures[lang]

  return (
    <section id="pricing" className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold text-white mb-4">{t.pricing_title}</h2>
          <p className="text-gray-500 text-lg">{t.pricing_sub}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          className="max-w-lg mx-auto"
        >
          <div className="bg-[#0f0f0f] border-2 border-orange-500 rounded-2xl p-8 relative">
            {/* Badge */}
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-orange-500 text-white px-6 py-1.5 rounded-full text-sm font-semibold whitespace-nowrap">
              {t.pricing_badge}
            </div>

            {/* Price */}
            <div className="text-center mb-8 pt-2">
              <div className="text-7xl font-black text-white mb-1">$23</div>
              <div className="text-gray-500 text-sm">{t.pricing_month_free}</div>
            </div>

            {/* Features grid */}
            <div className="grid grid-cols-2 gap-3 mb-8">
              {features.map((f) => (
                <div key={f} className="flex items-center gap-2 text-sm text-gray-300">
                  <IconCheck size={14} className="text-orange-500 flex-shrink-0" />
                  {f}
                </div>
              ))}
            </div>

            {/* CTA */}
            <button className="w-full bg-orange-500 hover:bg-orange-400 text-white font-bold py-4 rounded-xl text-lg transition-colors shadow-lg shadow-orange-500/25">
              {t.pricing_try}
            </button>

            <p className="text-center text-gray-600 text-xs mt-3">{t.pricing_no_card}</p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

// ─── FAQ ──────────────────────────────────────────────────────────────────────

function FAQ({ t }: { t: T }) {
  const [open, setOpen] = useState<number | null>(null)

  const faqs = [
    { q: t.faq_q1, a: t.faq_a1 },
    { q: t.faq_q2, a: t.faq_a2 },
    { q: t.faq_q3, a: t.faq_a3 },
    { q: t.faq_q4, a: t.faq_a4 },
    { q: t.faq_q5, a: t.faq_a5 },
  ]

  return (
    <section className="py-24 px-6">
      <div className="max-w-3xl mx-auto">
        <motion.h2
          initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
          className="text-4xl font-bold text-white text-center mb-12"
        >
          {t.faq_title}
        </motion.h2>

        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="space-y-3">
          {faqs.map((faq, i) => (
            <motion.div key={i} variants={fadeUp} className="bg-[#0f0f0f] border border-[#1e1e1e] rounded-2xl overflow-hidden">
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between px-6 py-4 text-left hover:bg-white/[0.02] transition-colors"
              >
                <span className="text-white font-medium text-sm pr-4">{faq.q}</span>
                <IconChevronDown
                  size={18}
                  className={`text-gray-500 flex-shrink-0 transition-transform duration-300 ${open === i ? 'rotate-180 text-orange-500' : ''}`}
                />
              </button>
              {open === i && (
                <div className="px-6 pb-5 text-gray-400 text-sm leading-relaxed border-t border-[#1e1e1e] pt-4">
                  {faq.a}
                </div>
              )}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

// ─── CTA Banner ───────────────────────────────────────────────────────────────

function CTABanner({ t }: { t: T }) {
  return (
    <section className="py-24 px-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.97 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto gradient-cta border border-orange-500/20 rounded-3xl py-20 px-8 text-center"
      >
        <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">{t.cta_title}</h2>
        <p className="text-gray-400 text-lg mb-10">{t.cta_sub}</p>
        <button className="relative bg-orange-500 text-white font-semibold px-10 py-4 rounded-xl text-base overflow-hidden group shadow-xl shadow-orange-500/25">
          <span className="relative z-10">{t.cta_btn} →</span>
          <div className="absolute inset-0 bg-gradient-to-r from-orange-600 to-orange-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </button>
      </motion.div>
    </section>
  )
}

// ─── Footer ───────────────────────────────────────────────────────────────────

function Footer({ t }: { t: T }) {
  return (
    <footer className="border-t border-[#1e1e1e] py-16 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-12">
          <div className="col-span-2 md:col-span-1">
            <div className="text-white font-bold text-lg mb-3">
              <span className="text-orange-500">NUCLEAR</span> OS
            </div>
            <p className="text-gray-600 text-sm leading-relaxed">©2025 Nuclear OS</p>
          </div>
          <div>
            <h4 className="text-gray-400 font-medium text-sm mb-4">{t.footer_product}</h4>
            <ul className="space-y-3">
              {[t.footer_features, t.footer_pricing, t.footer_docs].map((item) => (
                <li key={item}><a href="#" className="text-gray-600 hover:text-white text-sm transition-colors">{item}</a></li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-gray-400 font-medium text-sm mb-4">{t.footer_company}</h4>
            <ul className="space-y-3">
              {[t.footer_about, t.footer_contact].map((item) => (
                <li key={item}><a href="#" className="text-gray-600 hover:text-white text-sm transition-colors">{item}</a></li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-gray-400 font-medium text-sm mb-4">Contact</h4>
            <ul className="space-y-3 text-gray-600 text-sm">
              <li>nuclear-os.com</li>
              <li>contact@nuclear-os.com</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-[#1e1e1e] pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <span className="text-gray-700 text-xs">©2025 Nuclear OS. All rights reserved.</span>
          <span className="text-gray-700 text-xs">nuclear-os.com</span>
        </div>
      </div>
    </footer>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function LandingPage() {
  const [lang, setLang] = useState<Lang>('ru')
  const t = translations[lang]

  return (
    <div className="bg-[#060809] min-h-screen text-white">
      <Navbar lang={lang} setLang={setLang} t={t} />
      <main>
        <Hero t={t} />
        <MarqueeTicker />
        <Stats t={t} />
        <Features t={t} lang={lang} />
        <AIShowcase t={t} />
        <Comparison t={t} />
        <Pricing t={t} lang={lang} />
        <FAQ t={t} />
        <CTABanner t={t} />
      </main>
      <Footer t={t} />
    </div>
  )
}
