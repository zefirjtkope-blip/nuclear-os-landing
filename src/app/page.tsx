'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, useInView, type Variants } from 'framer-motion'
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
} from '@tabler/icons-react'

// ─── Types ────────────────────────────────────────────────────────────────────

type Lang = 'ru' | 'en' | 'ua'

interface T {
  nav_login: string
  nav_try: string
  hero_title: string
  hero_sub1: string
  hero_sub2: string
  hero_try: string
  hero_demo: string
  hero_owners: string
  features_title: string
  features_sub: string
  ai_title: string
  ai_sub: string
  ai_q1: string
  ai_q2: string
  ai_q3: string
  ai_q4: string
  ai_q5: string
  ai_chat_q1: string
  ai_chat_a1: string
  ai_chat_q2: string
  ai_chat_a2: string
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
  pricing_monthly: string
  pricing_annual: string
  pricing_per_month: string
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
  feat_pos_title: string
  feat_pos_desc: string
  feat_ai_title: string
  feat_ai_desc: string
  feat_stock_title: string
  feat_stock_desc: string
  feat_staff_title: string
  feat_staff_desc: string
  feat_analytics_title: string
  feat_analytics_desc: string
  feat_locations_title: string
  feat_locations_desc: string
  plan_start: string
  plan_business: string
  plan_pro: string
  plan_popular: string
  plan_start_cta: string
  plan_business_cta: string
  plan_pro_cta: string
  plan_start_f1: string
  plan_start_f2: string
  plan_start_f3: string
  plan_start_f4: string
  plan_start_f5: string
  plan_business_f1: string
  plan_business_f2: string
  plan_business_f3: string
  plan_business_f4: string
  plan_business_f5: string
  plan_business_f6: string
  plan_pro_f1: string
  plan_pro_f2: string
  plan_pro_f3: string
  plan_pro_f4: string
  plan_pro_f5: string
  plan_pro_f6: string
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
  nav_features: string
  nav_pricing: string
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
    hero_sub2: 'Всё что нужно — в одном окне',
    hero_try: 'Начать бесплатно',
    hero_demo: 'Смотреть демо',
    hero_owners: 'Уже используют владельцы бизнеса',
    features_title: 'Всё что нужно для бизнеса',
    features_sub: 'Один продукт вместо пяти разных инструментов',
    ai_title: 'Nuclear AI знает ваш бизнес',
    ai_sub: 'Спросите на человеческом языке — получите реальные данные',
    ai_q1: '"сколько заработали сегодня?"',
    ai_q2: '"поменяй цену АПА на 65"',
    ai_q3: '"кто лучший кассир за месяц?"',
    ai_q4: '"что скоро закончится на складе?"',
    ai_q5: '"прогноз на следующую неделю"',
    ai_chat_q1: 'сколько заработали сегодня?',
    ai_chat_a1: '₴ 14 320 за сегодня — 47 чеков, средний чек ₴305.\nЛучший час: 19:00–20:00 (₴2 840)',
    ai_chat_q2: 'что скоро закончится на складе?',
    ai_chat_a2: 'Критично: АПА 0.5 (3 шт), Колос н/ф (5 шт).\nРекомендую заказать у Carlsberg UA',
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
    pricing_title: 'Простые цены',
    pricing_sub: 'Начните бесплатно. Подключите тариф когда будете готовы.',
    pricing_monthly: 'Ежемесячно',
    pricing_annual: 'Ежегодно',
    pricing_per_month: '/мес',
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
    feat_pos_title: 'Умная касса',
    feat_pos_desc: 'Drag & drop, скидки, сплит-оплата, штрихкоды. Кассир обучится за 5 минут',
    feat_ai_title: 'Nuclear AI',
    feat_ai_desc: 'Спросите "сколько заработали сегодня" — AI ответит за 1 секунду с реальными данными',
    feat_stock_title: 'Склад и учёт',
    feat_stock_desc: 'Автосписание при продаже, ревизия, поставщики, сроки годности',
    feat_staff_title: 'Персонал',
    feat_staff_desc: 'PIN-авторизация, зарплаты, календарь смен, задачи, документы сотрудников',
    feat_analytics_title: 'Аналитика',
    feat_analytics_desc: 'Выручка по часам, дням, кассирам. Прогноз на неделю. Экспорт в Excel',
    feat_locations_title: 'Сеть точек',
    feat_locations_desc: 'Управляйте несколькими заведениями из одного аккаунта. Карта точек включена',
    plan_start: 'Старт',
    plan_business: 'Бизнес',
    plan_pro: 'Pro',
    plan_popular: 'Популярный',
    plan_start_cta: 'Начать',
    plan_business_cta: 'Выбрать план',
    plan_pro_cta: 'Связаться',
    plan_start_f1: '1 касса',
    plan_start_f2: '1 точка',
    plan_start_f3: 'Базовая аналитика',
    plan_start_f4: 'Принтер чеков',
    plan_start_f5: 'Склад и ревизия',
    plan_business_f1: '3 кассы',
    plan_business_f2: '3 точки',
    plan_business_f3: 'Nuclear AI',
    plan_business_f4: 'Полная аналитика',
    plan_business_f5: 'Зарплаты',
    plan_business_f6: 'Приоритетная поддержка',
    plan_pro_f1: 'Неограниченно касс',
    plan_pro_f2: 'Неограниченно точек',
    plan_pro_f3: 'Nuclear AI Pro',
    plan_pro_f4: 'Экспорт Excel/PDF',
    plan_pro_f5: 'API доступ',
    plan_pro_f6: 'Личный онбординг',
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
    ai_title: 'Nuclear AI knows your business',
    ai_sub: 'Ask in plain language — get real data instantly',
    ai_q1: '"how much did we earn today?"',
    ai_q2: '"change APA price to 65"',
    ai_q3: '"who is the best cashier this month?"',
    ai_q4: '"what is running low in stock?"',
    ai_q5: '"forecast for next week"',
    ai_chat_q1: 'how much did we earn today?',
    ai_chat_a1: '₴ 14,320 today — 47 receipts, avg ₴305.\nBest hour: 19:00–20:00 (₴2,840)',
    ai_chat_q2: 'what is running low in stock?',
    ai_chat_a2: 'Critical: APA 0.5L (3 left), Kolos n/f (5 left).\nSuggest ordering from Carlsberg UA',
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
    pricing_title: 'Simple pricing',
    pricing_sub: "Start free. Subscribe when you're ready.",
    pricing_monthly: 'Monthly',
    pricing_annual: 'Annual',
    pricing_per_month: '/mo',
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
    feat_pos_title: 'Smart POS',
    feat_pos_desc: 'Drag & drop, discounts, split payment, barcodes. Cashier learns in 5 minutes',
    feat_ai_title: 'Nuclear AI',
    feat_ai_desc: 'Ask "how much did we earn today" — AI answers in 1 second with real data',
    feat_stock_title: 'Inventory',
    feat_stock_desc: 'Stock auto-updates on every sale. Audits, suppliers, and expiry tracking built in.',
    feat_staff_title: 'Staff',
    feat_staff_desc: 'PIN login, payroll, shift scheduling, tasks, and employee documents',
    feat_analytics_title: 'Analytics',
    feat_analytics_desc: 'Revenue by hour, day, cashier. Weekly forecast. Excel export',
    feat_locations_title: 'Multi-location',
    feat_locations_desc: 'Manage multiple venues from one account. Location map included',
    plan_start: 'Start',
    plan_business: 'Business',
    plan_pro: 'Pro',
    plan_popular: 'Popular',
    plan_start_cta: 'Get started',
    plan_business_cta: 'Choose plan',
    plan_pro_cta: 'Contact us',
    plan_start_f1: '1 POS terminal',
    plan_start_f2: '1 location',
    plan_start_f3: 'Basic analytics',
    plan_start_f4: 'Receipt printer',
    plan_start_f5: 'Inventory & audit',
    plan_business_f1: '3 POS terminals',
    plan_business_f2: '3 locations',
    plan_business_f3: 'Nuclear AI',
    plan_business_f4: 'Full analytics',
    plan_business_f5: 'Payroll',
    plan_business_f6: 'Priority support',
    plan_pro_f1: 'Unlimited POS',
    plan_pro_f2: 'Unlimited locations',
    plan_pro_f3: 'Nuclear AI Pro',
    plan_pro_f4: 'Excel/PDF export',
    plan_pro_f5: 'API access',
    plan_pro_f6: 'Personal onboarding',
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
    faq_a5: 'Yes — all plans include multi-location. No extra charge.',
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
    hero_sub2: 'Все що потрібно — в одному вікні',
    hero_try: 'Почати безкоштовно',
    hero_demo: 'Дивитись демо',
    hero_owners: 'Вже використовують власники бізнесу',
    features_title: 'Все що потрібно для бізнесу',
    features_sub: "Один продукт замість п'яти різних інструментів",
    ai_title: 'Nuclear AI знає ваш бізнес',
    ai_sub: 'Запитайте людською мовою — отримайте реальні дані',
    ai_q1: '"скільки заробили сьогодні?"',
    ai_q2: '"зміни ціну АПА на 65"',
    ai_q3: '"хто найкращий касир за місяць?"',
    ai_q4: '"що скоро закінчиться на складі?"',
    ai_q5: '"прогноз на наступний тиждень"',
    ai_chat_q1: 'скільки заробили сьогодні?',
    ai_chat_a1: '₴ 14 320 за сьогодні — 47 чеків, середній чек ₴305.\nНайкраща година: 19:00–20:00 (₴2 840)',
    ai_chat_q2: 'що закінчується на складі?',
    ai_chat_a2: 'Критично: АПА 0.5 (3 шт), Колос н/ф (5 шт).\nРекомендую замовити у Carlsberg UA',
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
    pricing_title: 'Прості ціни',
    pricing_sub: 'Почніть безкоштовно. Підключіть тариф, коли будете готові.',
    pricing_monthly: 'Щомісяця',
    pricing_annual: 'Щорічно',
    pricing_per_month: '/міс',
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
    feat_pos_title: 'Розумна каса',
    feat_pos_desc: 'Drag & drop, знижки, спліт-оплата, штрихкоди. Касир навчиться за 5 хвилин',
    feat_ai_title: 'Nuclear AI',
    feat_ai_desc: 'Запитайте "скільки заробили сьогодні" — AI відповість за 1 секунду з реальними даними',
    feat_stock_title: 'Склад і облік',
    feat_stock_desc: 'Автосписання при продажу, ревізія, постачальники, терміни придатності',
    feat_staff_title: 'Персонал',
    feat_staff_desc: 'PIN-авторизація, зарплати, графік змін, завдання та документи персоналу',
    feat_analytics_title: 'Аналітика',
    feat_analytics_desc: 'Виручка за годинами, днями, касирами. Прогноз на тиждень. Експорт в Excel',
    feat_locations_title: 'Мережа точок',
    feat_locations_desc: 'Керуйте кількома закладами з одного акаунту. Карта точок включена',
    plan_start: 'Старт',
    plan_business: 'Бізнес',
    plan_pro: 'Pro',
    plan_popular: 'Популярний',
    plan_start_cta: 'Почати',
    plan_business_cta: 'Обрати план',
    plan_pro_cta: "Зв'язатись",
    plan_start_f1: '1 каса',
    plan_start_f2: '1 точка',
    plan_start_f3: 'Базова аналітика',
    plan_start_f4: 'Принтер чеків',
    plan_start_f5: 'Склад і ревізія',
    plan_business_f1: '3 каси',
    plan_business_f2: '3 точки',
    plan_business_f3: 'Nuclear AI',
    plan_business_f4: 'Повна аналітика',
    plan_business_f5: 'Зарплати',
    plan_business_f6: 'Пріоритетна підтримка',
    plan_pro_f1: 'Необмежено кас',
    plan_pro_f2: 'Необмежено точок',
    plan_pro_f3: 'Nuclear AI Pro',
    plan_pro_f4: 'Експорт Excel/PDF',
    plan_pro_f5: 'API доступ',
    plan_pro_f6: 'Особистий онбординг',
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
        {/* Logo */}
        <span className="text-white font-bold text-lg tracking-tight flex-shrink-0">
          <span className="text-orange-500">NUCLEAR</span> OS
        </span>

        {/* Desktop nav links */}
        <div className="hidden md:flex items-center gap-6 text-sm text-gray-400">
          <a href="#features" className="hover:text-white transition-colors">{t.nav_features}</a>
          <a href="#pricing" className="hover:text-white transition-colors">{t.nav_pricing}</a>
        </div>

        {/* Lang switcher */}
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

        {/* Desktop actions */}
        <div className="hidden md:flex items-center gap-3">
          <button className="text-gray-400 hover:text-white text-sm transition-colors">
            {t.nav_login}
          </button>
          <button className="bg-orange-500 hover:bg-orange-400 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors">
            {t.nav_try}
          </button>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden text-gray-400 hover:text-white transition-colors"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <IconX size={22} /> : <IconMenu2 size={22} />}
        </button>
      </div>

      {/* Mobile dropdown */}
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
          <a href="#features" onClick={() => setMenuOpen(false)} className="text-gray-300 hover:text-white text-sm">
            {t.nav_features}
          </a>
          <a href="#pricing" onClick={() => setMenuOpen(false)} className="text-gray-300 hover:text-white text-sm">
            {t.nav_pricing}
          </a>
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
      {/* Glow orb */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full bg-orange-500/10 blur-[120px] pointer-events-none" />

      <motion.div
        initial="hidden"
        animate="visible"
        variants={stagger}
        className="relative max-w-4xl mx-auto"
      >
        {/* Badge */}
        <motion.div
          variants={fadeUp}
          className="inline-flex items-center gap-2 bg-orange-500/10 border border-orange-500/20 text-orange-400 text-sm px-4 py-1.5 rounded-full mb-8"
        >
          <span className="w-1.5 h-1.5 bg-orange-500 rounded-full animate-pulse" />
          nuclear-os.com · v1.0
        </motion.div>

        {/* Title */}
        <motion.h1
          variants={fadeUp}
          className="text-6xl sm:text-7xl font-bold text-white leading-tight tracking-tight mb-6"
        >
          {t.hero_title.split('\n').map((line, i) => (
            <span key={i}>
              {i > 0 && <br />}
              {line}
            </span>
          ))}
        </motion.h1>

        {/* Sub */}
        <motion.p variants={fadeUp} className="text-xl text-gray-400 mb-2">
          {t.hero_sub1}
        </motion.p>
        <motion.p variants={fadeUp} className="text-lg text-gray-500 mb-10">
          {t.hero_sub2}
        </motion.p>

        {/* CTA buttons */}
        <motion.div variants={fadeUp} className="flex flex-wrap items-center justify-center gap-4 mb-8">
          {/* Primary — gradient hover */}
          <button className="relative px-8 py-4 bg-orange-500 rounded-xl text-white font-semibold text-lg overflow-hidden group shadow-lg shadow-orange-500/25">
            <span className="relative z-10">{t.hero_try} →</span>
            <div className="absolute inset-0 bg-gradient-to-r from-orange-600 to-orange-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </button>
          {/* Secondary */}
          <button className="flex items-center gap-2 bg-[#0f0f0f] hover:bg-[#161616] border border-[#1e1e1e] text-white font-medium px-6 py-4 rounded-xl text-base transition-colors">
            <IconPlayerPlay size={16} className="text-orange-500" />
            {t.hero_demo}
          </button>
        </motion.div>

        {/* Social proof avatars */}
        <motion.div variants={fadeUp} className="flex items-center justify-center gap-4 text-gray-500 text-sm">
          <div className="flex -space-x-2">
            {avatars.map((init, i) => (
              <div
                key={i}
                className="w-8 h-8 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 border-2 border-[#060809] flex items-center justify-center text-white text-xs font-bold"
              >
                {init}
              </div>
            ))}
          </div>
          <span>{t.hero_owners}</span>
          <div className="flex gap-0.5">
            {[1, 2, 3, 4, 5].map((i) => (
              <span key={i} className="text-orange-400 text-xs">★</span>
            ))}
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
            {item}
            <span className="ml-8 text-orange-500/40">·</span>
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
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={stagger}
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

// ─── Features ─────────────────────────────────────────────────────────────────

type IconCmp = React.ComponentType<{ size?: number; className?: string }>

function Features({ t }: { t: T }) {
  const features: { Icon: IconCmp; title: string; desc: string }[] = [
    { Icon: IconDeviceDesktop, title: t.feat_pos_title, desc: t.feat_pos_desc },
    { Icon: IconBrain, title: t.feat_ai_title, desc: t.feat_ai_desc },
    { Icon: IconPackage, title: t.feat_stock_title, desc: t.feat_stock_desc },
    { Icon: IconUsers, title: t.feat_staff_title, desc: t.feat_staff_desc },
    { Icon: IconChartBar, title: t.feat_analytics_title, desc: t.feat_analytics_desc },
    { Icon: IconMapPin, title: t.feat_locations_title, desc: t.feat_locations_desc },
  ]

  return (
    <section id="features" className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={fadeUp}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-white mb-4">{t.features_title}</h2>
          <p className="text-gray-500 text-lg">{t.features_sub}</p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {features.map(({ Icon, title, desc }, i) => (
            <motion.div
              key={title}
              custom={i}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-40px' }}
              className="bg-[#0f0f0f] border border-[#1e1e1e] rounded-2xl p-6 hover:border-orange-500/30 transition-colors duration-300 group"
            >
              <Icon
                size={28}
                className="text-orange-500 mb-4 group-hover:scale-110 transition-transform duration-300"
              />
              <h3 className="text-white font-semibold text-lg mb-2">{title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── AI Typing Demo ───────────────────────────────────────────────────────────

function AITypingDemo() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true })
  const [displayText, setDisplayText] = useState('')
  const fullText = 'Виручка за сьогодні: 15 420₴\nЧеків: 47 · Середній чек: 328₴\nНайкращий касир: Іван — 8 230₴'

  useEffect(() => {
    if (!isInView) return
    let i = 0
    setDisplayText('')
    const timer = setInterval(() => {
      i++
      setDisplayText(fullText.slice(0, i))
      if (i >= fullText.length) clearInterval(timer)
    }, 30)
    return () => clearInterval(timer)
  }, [isInView])

  return (
    <div ref={ref} className="font-mono text-sm text-green-400 whitespace-pre-line leading-relaxed">
      {displayText}
      {displayText.length < fullText.length && (
        <span className="animate-pulse opacity-80">|</span>
      )}
    </div>
  )
}

// ─── AI Showcase ──────────────────────────────────────────────────────────────

function AIShowcase({ t }: { t: T }) {
  const queries = [t.ai_q1, t.ai_q2, t.ai_q3, t.ai_q4, t.ai_q5]

  return (
    <section className="gradient-ai py-24 px-6">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
        {/* Left — text */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={stagger}
        >
          <motion.h2 variants={fadeUp} className="text-4xl font-bold text-white mb-4">
            {t.ai_title}
          </motion.h2>
          <motion.p variants={fadeUp} className="text-gray-400 text-lg mb-8">
            {t.ai_sub}
          </motion.p>
          <motion.ul variants={stagger} className="space-y-3">
            {queries.map((q, i) => (
              <motion.li
                key={i}
                variants={fadeUp}
                className="flex items-center gap-3 text-sm"
              >
                <span className="text-orange-500 font-mono">→</span>
                <span className="font-mono bg-[#0f0f0f] border border-[#1e1e1e] px-3 py-1.5 rounded-lg text-gray-300">
                  {q}
                </span>
              </motion.li>
            ))}
          </motion.ul>
        </motion.div>

        {/* Right — mock chat with typing effect */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-[#0d0d0d] border border-[#1e1e1e] rounded-2xl overflow-hidden"
        >
          {/* Chat header */}
          <div className="flex items-center gap-3 px-5 py-4 border-b border-[#1e1e1e]">
            <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse" />
            <span className="text-white text-sm font-medium">Nuclear AI</span>
            <span className="ml-auto text-[10px] text-green-500 bg-green-500/10 px-2 py-0.5 rounded-full">
              online
            </span>
          </div>

          {/* Messages */}
          <div className="p-5 space-y-5 min-h-[300px]">
            {/* Q1 */}
            <div className="flex justify-end">
              <div className="bg-orange-500/15 border border-orange-500/20 text-orange-200 text-sm px-4 py-2.5 rounded-2xl rounded-tr-sm max-w-xs">
                {t.ai_chat_q1}
              </div>
            </div>
            {/* A1 — static */}
            <div className="flex gap-3">
              <div className="w-7 h-7 rounded-full bg-orange-500/20 border border-orange-500/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-orange-400 text-xs font-bold">N</span>
              </div>
              <div className="bg-[#161616] border border-[#252525] text-gray-300 text-sm px-4 py-3 rounded-2xl rounded-tl-sm max-w-xs">
                {t.ai_chat_a1.split('\n').map((line, i) => (
                  <span key={i}>{i > 0 && <br />}{line}</span>
                ))}
              </div>
            </div>

            {/* Q2 */}
            <div className="flex justify-end">
              <div className="bg-orange-500/15 border border-orange-500/20 text-orange-200 text-sm px-4 py-2.5 rounded-2xl rounded-tr-sm max-w-xs">
                {t.ai_chat_q2}
              </div>
            </div>
            {/* A2 — typing effect */}
            <div className="flex gap-3">
              <div className="w-7 h-7 rounded-full bg-orange-500/20 border border-orange-500/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-orange-400 text-xs font-bold">N</span>
              </div>
              <div className="bg-[#161616] border border-[#252525] px-4 py-3 rounded-2xl rounded-tl-sm max-w-xs">
                <AITypingDemo />
              </div>
            </div>
          </div>

          {/* Input */}
          <div className="px-5 pb-5">
            <div className="flex items-center gap-3 bg-[#161616] border border-[#252525] rounded-xl px-4 py-3">
              <span className="text-gray-600 text-sm flex-1">Запитати Nuclear AI...</span>
              <div className="w-6 h-6 bg-orange-500 rounded-lg flex items-center justify-center">
                <span className="text-white text-xs">↑</span>
              </div>
            </div>
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
    { label: t.comp_ai, nuclear: true, poster: false, sky: false },
    { label: t.comp_team, nuclear: true, poster: false, sky: false },
    { label: t.comp_cashier_ai, nuclear: true, poster: false, sky: false },
    { label: t.comp_dark, nuclear: true, poster: false, sky: false },
    { label: t.comp_network, nuclear: '✓', poster: t.comp_paid, sky: t.comp_paid },
    { label: t.comp_price, nuclear: 'від 699₴', poster: 'від 600₴', sky: 'від 306₴' },
  ]

  function renderCell(v: Cell, isNuclear = false) {
    if (v === true)
      return <IconCheck size={18} className={`mx-auto ${isNuclear ? 'text-orange-500' : 'text-green-500'}`} />
    if (v === false)
      return <IconX size={18} className="mx-auto text-gray-700" />
    return (
      <span className={`text-sm ${isNuclear ? 'text-orange-400 font-semibold' : 'text-gray-400'}`}>
        {v}
      </span>
    )
  }

  return (
    <section className="py-24 px-6">
      <div className="max-w-4xl mx-auto">
        <motion.h2
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          className="text-4xl font-bold text-white text-center mb-12"
        >
          {t.comparison_title}
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="overflow-hidden rounded-2xl border border-[#1e1e1e]"
        >
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#1e1e1e]">
                <th className="text-left text-gray-500 text-sm font-medium px-6 py-4 bg-[#0a0a0a]">
                  {t.comp_feature}
                </th>
                {/* Nuclear OS — highlighted column with badge */}
                <th className="text-center px-6 py-4 bg-orange-500/10 border-x border-orange-500/30 relative">
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-orange-500 text-white text-[10px] font-semibold px-3 py-0.5 rounded-full whitespace-nowrap">
                    {t.comp_best}
                  </div>
                  <span className="text-orange-400 text-sm font-bold">Nuclear OS</span>
                </th>
                <th className="text-center text-gray-400 text-sm font-medium px-6 py-4 bg-[#0a0a0a]">
                  Poster
                </th>
                <th className="text-center text-gray-400 text-sm font-medium px-6 py-4 bg-[#0a0a0a]">
                  SkyService
                </th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, i) => (
                <tr
                  key={i}
                  className="border-b border-[#1e1e1e] last:border-0 hover:bg-white/[0.02] transition-colors"
                >
                  <td className="text-gray-300 text-sm px-6 py-4">{row.label}</td>
                  <td className="text-center px-6 py-4 bg-orange-500/5 border-x border-orange-500/20">
                    {renderCell(row.nuclear, true)}
                  </td>
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

// ─── Pricing ──────────────────────────────────────────────────────────────────

function Pricing({ t }: { t: T }) {
  const [annual, setAnnual] = useState(false)

  const plans = [
    {
      name: t.plan_start,
      monthlyPrice: 699,
      features: [t.plan_start_f1, t.plan_start_f2, t.plan_start_f3, t.plan_start_f4, t.plan_start_f5],
      cta: t.plan_start_cta,
      highlight: false,
      badge: null as string | null,
    },
    {
      name: t.plan_business,
      monthlyPrice: 1299,
      features: [t.plan_business_f1, t.plan_business_f2, t.plan_business_f3, t.plan_business_f4, t.plan_business_f5, t.plan_business_f6],
      cta: t.plan_business_cta,
      highlight: true,
      badge: t.plan_popular,
    },
    {
      name: t.plan_pro,
      monthlyPrice: 1999,
      features: [t.plan_pro_f1, t.plan_pro_f2, t.plan_pro_f3, t.plan_pro_f4, t.plan_pro_f5, t.plan_pro_f6],
      cta: t.plan_pro_cta,
      highlight: false,
      badge: null as string | null,
    },
  ]

  return (
    <section id="pricing" className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          className="text-center mb-10"
        >
          <h2 className="text-4xl font-bold text-white mb-4">{t.pricing_title}</h2>
          <p className="text-gray-500 text-lg mb-8">{t.pricing_sub}</p>

          {/* Toggle */}
          <div className="flex items-center justify-center gap-3">
            <span className={`text-sm font-medium ${!annual ? 'text-white' : 'text-gray-500'}`}>
              {t.pricing_monthly}
            </span>
            <button
              onClick={() => setAnnual(!annual)}
              className={`relative w-12 h-6 rounded-full transition-colors duration-300 ${
                annual ? 'bg-orange-500' : 'bg-[#2a2a2a]'
              }`}
            >
              <div
                className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform duration-300 ${
                  annual ? 'translate-x-6' : 'translate-x-0.5'
                }`}
              />
            </button>
            <span className={`text-sm font-medium flex items-center gap-2 ${annual ? 'text-white' : 'text-gray-500'}`}>
              {t.pricing_annual}
              <span className="bg-green-500/20 text-green-400 text-xs px-2 py-0.5 rounded-full font-semibold">
                −20%
              </span>
            </span>
          </div>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          variants={stagger}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {plans.map((plan) => {
            const price = annual ? Math.round(plan.monthlyPrice * 0.8) : plan.monthlyPrice
            return (
              <motion.div
                key={plan.name}
                variants={fadeUp}
                className={`rounded-2xl p-6 flex flex-col relative ${
                  plan.highlight
                    ? 'bg-orange-500/10 border-2 border-orange-500'
                    : 'bg-[#0f0f0f] border border-[#1e1e1e]'
                }`}
              >
                {plan.badge && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-orange-500 text-white text-xs font-semibold px-4 py-1 rounded-full whitespace-nowrap">
                    {plan.badge}
                  </span>
                )}

                <div className="mb-6">
                  <h3 className="text-white font-semibold text-lg mb-4">{plan.name}</h3>
                  <div className="flex items-end gap-1">
                    <span className="text-4xl font-bold text-white">{price}₴</span>
                    <span className="text-gray-500 text-sm mb-1">{t.pricing_per_month}</span>
                  </div>
                  {annual && (
                    <p className="text-green-400 text-xs mt-1">
                      {Math.round(plan.monthlyPrice * 0.8 * 12)}₴ / рік
                    </p>
                  )}
                </div>

                <ul className="space-y-3 flex-1 mb-8">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-center gap-2.5 text-sm text-gray-300">
                      <IconCheck
                        size={15}
                        className={plan.highlight ? 'text-orange-400' : 'text-gray-500'}
                      />
                      {f}
                    </li>
                  ))}
                </ul>

                <button
                  className={`w-full py-3 rounded-xl font-semibold text-sm transition-colors ${
                    plan.highlight
                      ? 'bg-orange-500 hover:bg-orange-400 text-white'
                      : 'bg-[#161616] hover:bg-[#1e1e1e] border border-[#252525] text-white'
                  }`}
                >
                  {plan.cta}
                </button>
              </motion.div>
            )
          })}
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
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          className="text-4xl font-bold text-white text-center mb-12"
        >
          {t.faq_title}
        </motion.h2>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={stagger}
          className="space-y-3"
        >
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              className="bg-[#0f0f0f] border border-[#1e1e1e] rounded-2xl overflow-hidden"
            >
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between px-6 py-4 text-left hover:bg-white/[0.02] transition-colors"
              >
                <span className="text-white font-medium text-sm pr-4">{faq.q}</span>
                <IconChevronDown
                  size={18}
                  className={`text-gray-500 flex-shrink-0 transition-transform duration-300 ${
                    open === i ? 'rotate-180 text-orange-500' : ''
                  }`}
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
        initial={{ opacity: 0, scale: 0.97 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
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
            <p className="text-gray-600 text-sm leading-relaxed">
              ©2025 Nuclear OS
              <br />
              Чорноморськ, Україна
            </p>
          </div>

          <div>
            <h4 className="text-gray-400 font-medium text-sm mb-4">{t.footer_product}</h4>
            <ul className="space-y-3">
              {[t.footer_features, t.footer_pricing, t.footer_docs].map((item) => (
                <li key={item}>
                  <a href="#" className="text-gray-600 hover:text-white text-sm transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-gray-400 font-medium text-sm mb-4">{t.footer_company}</h4>
            <ul className="space-y-3">
              {[t.footer_about, t.footer_contact].map((item) => (
                <li key={item}>
                  <a href="#" className="text-gray-600 hover:text-white text-sm transition-colors">
                    {item}
                  </a>
                </li>
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
          <span className="text-gray-700 text-xs">Made in Ukraine 🇺🇦</span>
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
        <Features t={t} />
        <AIShowcase t={t} />
        <Comparison t={t} />
        <Pricing t={t} />
        <FAQ t={t} />
        <CTABanner t={t} />
      </main>
      <Footer t={t} />
    </div>
  )
}
