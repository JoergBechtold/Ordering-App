// global values
let minimumOrder = 25.0;
let newMinimumOrder = 0;
let roundNewMinimumOrder = 0;
let isDeliveryCostAdded = false;
let deliveryCosts = 5.0;
let roundTotalPriceComma = 0;
let roundNewMinimumOrderComma = 0;
// let payPrice = 0;
let roundPayPriceComma = 0;
let subtotalRoundComma = 0;

let totalPrice = 0;
let subtotal = 0;

// Jason array for dishes
let dishes = [
  {
    category: 'Burger',
    menus: [
      {
        name: 'Colonel Original Burger',
        singlePrice: 7.99,
        amount: 1,
        description:
          'Colonel Sanders legendäres Meisterstück für den Original Taste! Saftiges Chicken nach Colonel Sanders Originalrezept mehrmals täglich frisch vor Ort paniert und zubereitet. Kombiniert mit unserer würzigen Original Sauce, knackigem Salat, frischer Tomatenscheibe, einer Scheibe Cheese und cremiger Sandwich Sauce. Serviert in einem Brioche Bun.',
      },
      {
        name: 'BBQ Bacon Burger',
        singlePrice: 8.49,
        amount: 1,
        description:
          'Ein rauchiges Highlight! Saftiges Beef-Patty, knuspriger Bacon, geschmolzener Cheddar-Käse, frische Zwiebelringe und knackiger Salat. Gekrönt mit einer herzhaften BBQ-Sauce in einem gerösteten Sesam-Bun.',
      },
      {
        name: 'Spicy Chicken Deluxe',
        singlePrice: 7.49,
        amount: 1,
        description:
          'Für alle, die es scharf mögen! Knuspriges, scharf gewürztes Chicken-Filet, knackiger Eisbergsalat, frische Gurkenscheiben und cremige Chili-Mayonnaise. Serviert in einem lockeren Brioche Bun.',
      },
      {
        name: 'Vegan Garden Burger',
        singlePrice: 6.99,
        amount: 1,
        description:
          'Ein Genuss für Vegetarier! Pflanzliches Patty auf Erbsenproteinbasis, frische Avocado-Creme, knackige Salatblätter, Gurken, Tomaten und eine vegane Knoblauchsauce. Eingebettet in ein Vollkorn-Brötchen.',
      },
      {
        name: 'Double Cheese Bacon Burger',
        singlePrice: 9.99,
        amount: 1,
        description:
          'Doppelt hält besser! Zwei saftige Beef-Patties, zwei Scheiben geschmolzener Cheddar, knuspriger Bacon, frische Zwiebeln und würzige Burgersauce. Serviert in einem gerösteten Brioche-Bun.',
      },
    ],
  },
  {
    category: 'Beilagen',
    menus: [
      {
        name: 'Crispy Fries',
        singlePrice: 2.99,
        description: 'Goldbraun frittierte Pommes, außen knusprig und innen weich. Perfekt gewürzt und der ideale Begleiter für jeden Burger.',
      },
      {
        name: 'Sweet Potato Fries',
        singlePrice: 3.49,
        description: 'Knusprige Süßkartoffelpommes mit einem Hauch von Süße und einer leichten Würzung. Perfekt zu Dips wie Aioli oder BBQ-Sauce.',
      },
      {
        name: 'Onion Rings',
        singlePrice: 3.99,
        description: 'Zwiebelringe in einem knusprigen Teigmantel, goldgelb frittiert. Ein Klassiker, der immer begeistert.',
      },
      {
        name: 'Mozzarella Sticks',
        singlePrice: 4.49,
        description: 'Cremiger Mozzarella-Käse, umhüllt von einer knusprigen Panade und perfekt frittiert. Serviert mit einem frischen Tomatendip.',
      },
      {
        name: 'Coleslaw',
        singlePrice: 2.49,
        description:
          'Frischer Krautsalat mit einem cremigen Dressing aus Mayonnaise, Senf und einem Hauch von Zitronensaft. Eine leichte und leckere Beilage.',
      },
    ],
  },
  {
    category: 'Drinks',
    menus: [
      {
        name: 'Coca-Cola',
        singlePrice: 2.49,
        description: 'Das klassische Erfrischungsgetränk mit der einzigartigen Rezeptur. Kalt serviert für den perfekten Genuss.',
      },
      {
        name: 'Classic Cola',
        singlePrice: 1.99,
        description: 'Der klassische Softdrink mit prickelnder Kohlensäure und dem unverwechselbaren Geschmack.',
      },
      {
        name: 'Homemade Lemonade',
        singlePrice: 3.49,
        description: 'Frische, hausgemachte Zitronenlimonade mit einem Hauch von Minze. Erfrischend und perfekt für heiße Tage.',
      },
      {
        name: 'Iced Tea Peach',
        singlePrice: 2.99,
        description: 'Eiskalter Pfirsich-Eistee mit einer dezenten Süße und einem fruchtigen Aroma. Ein echter Klassiker unter den Erfrischungen.',
      },
      {
        name: 'Sparkling Water',
        singlePrice: 1.99,
        description: 'Erfrischendes, prickelndes Mineralwasser. Ideal als Durstlöscher oder Begleitung zu jedem Menü.',
      },
      {
        name: 'Milkshake Chocolate',
        singlePrice: 4.49,
        description: 'Cremiger Schokoladen-Milchshake aus frischer Milch und reichhaltiger Schokoladensauce. Ein Genuss für alle Naschkatzen.',
      },
      {
        name: 'Green Smoothie',
        singlePrice: 5.49,
        description: 'Gesunder Smoothie aus Spinat, Grünkohl, Banane und Apfel für den extra Energie-Kick.',
      },
    ],
  },
];

// Jason array for basket
let basket = [];
