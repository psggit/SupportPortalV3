const kycDetailsMockData = [
  {
    id: "aadhaar",
    description: "Aadhaar",
    is_numeric: true,
  },
  {
    id: "pan",
    description: "PAN Card",
    is_numeric: false,
  },
  {
    id: "dl",
    description: "Driving License",
    is_numeric: true,
  },
  {
    id: "passport",
    description: "Passport",
    is_numeric: true,
  },
  {
    id: "voter_id",
    description: "Voter ID",
    is_numeric: true,
  },
];

const deliveryOrderReasons = [
  {
    id: "7",
    reason: "Test Transaction",
  },
  {
    id: "8",
    reason: "Test Transaction 2",
  },
];

const listGenre = {
  genres: [
    {
      id: 4,
      name: "Beer",
      ordinal_position: 1,
    },
    {
      id: 24,
      name: "Domestic Whisky",
      ordinal_position: 2,
    },
    {
      id: 25,
      name: "Imported Whisky",
      ordinal_position: 3,
    },
    {
      id: 6,
      name: "Rum",
      ordinal_position: 4,
    },
    {
      id: 26,
      name: "Single Malt Whisky",
      ordinal_position: 6,
    },
    {
      id: 5,
      name: "Vodka",
      ordinal_position: 7,
    },
    {
      id: 9,
      name: "Brandy",
      ordinal_position: 8,
    },
    {
      id: 27,
      name: "Domestic Wine",
      ordinal_position: 9,
    },
    {
      id: 28,
      name: "Imported Wine",
      ordinal_position: 10,
    },
    {
      id: 8,
      name: "Gin",
      ordinal_position: 11,
    },
    {
      id: 29,
      name: "Cognac",
      ordinal_position: 12,
    },
    {
      id: 3,
      name: "Liqueur",
      ordinal_position: 14,
    },
  ],
};

const listBrand = {
  brands: [
    {
      brand_id: 993,
      genre_id: 4,
      genre_name: "Beer",
      brand_name: "Kingfisher Blue",
      high_res_image:
        "https://res.cloudinary.com/www-hipbar-com/image/upload/c_scale,h_500/v1596734169/Brand%20Logo's/Place%20Holder%20New/Vodka.png",
      low_res_image:
        "https://res.cloudinary.com/www-hipbar-com/image/upload/c_scale,h_500/v1596734169/Brand%20Logo's/Place%20Holder%20New/Vodka.png",
      logo_high_res_image:
        "https://res.cloudinary.com/www-hipbar-com/image/upload/c_scale,h_500/v1596734169/Brand%20Logo's/Place%20Holder%20New/Vodka.png",
      logo_low_res_image:
        "https://res.cloudinary.com/www-hipbar-com/image/upload/c_scale,h_500/v1596734169/Brand%20Logo's/Place%20Holder%20New/Vodka.png",
      promo_text: "",
      brand_type_id: 3,
      sku: [
        {
          sku_id: 1276,
          volume: 650,
          promo_text: "",
          price: 150,
          brand_id: 993,
          brand_name: "Kingfisher Blue",
          logo_low_res_image:
            "https://res.cloudinary.com/www-hipbar-com/image/upload/c_scale,h_500/v1596734169/Brand%20Logo's/Place%20Holder%20New/Vodka.png",
          genre_id: 4,
          brand_type_id: 3,
          offer_value: 0,
          is_on_pack: false,
          retailer_price: 150,
          price_type: "LABEL",
        },
        {
          sku_id: 1278,
          volume: 325,
          promo_text: "",
          price: 80,
          brand_id: 993,
          brand_name: "Kingfisher Blue",
          logo_low_res_image:
            "https://res.cloudinary.com/www-hipbar-com/image/upload/c_scale,h_500/v1596734169/Brand%20Logo's/Place%20Holder%20New/Vodka.png",
          genre_id: 4,
          brand_type_id: 3,
          offer_value: 0,
          is_on_pack: false,
          retailer_price: 80,
          price_type: "LABEL",
        },
      ],
      country_of_origin: "India",
    },
    {
      brand_id: 1055,
      genre_id: 4,
      genre_name: "Beer",
      brand_name: "Kingfisher Lager Beer",
      high_res_image:
        "https://res.cloudinary.com/divakar/image/upload/v1545301043/HB_Goa_Carousel_Slot-02.jpg",
      low_res_image:
        "https://res.cloudinary.com/divakar/image/upload/v1545301043/HB_Goa_Carousel_Slot-02.jpg",
      logo_high_res_image:
        "https://res.cloudinary.com/divakar/image/upload/v1545301043/HB_Goa_Carousel_Slot-02.jpg",
      logo_low_res_image:
        "https://res.cloudinary.com/divakar/image/upload/v1545301043/HB_Goa_Carousel_Slot-02.jpg",
      promo_text: "",
      brand_type_id: 3,
      sku: [
        {
          sku_id: 1298,
          volume: 650,
          promo_text: "",
          price: 130,
          brand_id: 1055,
          brand_name: "Kingfisher Lager Beer",
          logo_low_res_image:
            "https://res.cloudinary.com/divakar/image/upload/v1545301043/HB_Goa_Carousel_Slot-02.jpg",
          genre_id: 4,
          brand_type_id: 3,
          offer_value: 0,
          is_on_pack: false,
          retailer_price: 130,
          price_type: "LABEL",
        },
        {
          sku_id: 1300,
          volume: 325,
          promo_text: "",
          price: 70,
          brand_id: 1055,
          brand_name: "Kingfisher Lager Beer",
          logo_low_res_image:
            "https://res.cloudinary.com/divakar/image/upload/v1545301043/HB_Goa_Carousel_Slot-02.jpg",
          genre_id: 4,
          brand_type_id: 3,
          offer_value: 0,
          is_on_pack: false,
          retailer_price: 70,
          price_type: "LABEL",
        },
      ],
      country_of_origin: "India",
    },
    {
      brand_id: 999,
      genre_id: 4,
      genre_name: "Beer",
      brand_name: "Kingfisher Magnum Strong",
      high_res_image:
        "https://res.cloudinary.com/www-hipbar-com/image/upload/v1536029696/blank.png",
      low_res_image:
        "https://res.cloudinary.com/www-hipbar-com/image/upload/v1536029696/blank.png",
      logo_high_res_image:
        "https://res.cloudinary.com/www-hipbar-com/image/upload/c_scale,h_500/v1557824990/Brand%20Logo's/TN/Beer.jpg",
      logo_low_res_image:
        "https://res.cloudinary.com/www-hipbar-com/image/upload/c_scale,h_300/v1557824990/Brand%20Logo's/TN/Beer.jpg",
      promo_text: "",
      brand_type_id: 3,
      sku: [
        {
          sku_id: 1287,
          volume: 650,
          promo_text: "",
          price: 150,
          brand_id: 999,
          brand_name: "Kingfisher Magnum Strong",
          logo_low_res_image:
            "https://res.cloudinary.com/www-hipbar-com/image/upload/c_scale,h_300/v1557824990/Brand%20Logo's/TN/Beer.jpg",
          genre_id: 4,
          brand_type_id: 3,
          offer_value: 0,
          is_on_pack: false,
          retailer_price: 150,
          price_type: "LABEL",
        },
        {
          sku_id: 1289,
          volume: 325,
          promo_text: "",
          price: 80,
          brand_id: 999,
          brand_name: "Kingfisher Magnum Strong",
          logo_low_res_image:
            "https://res.cloudinary.com/www-hipbar-com/image/upload/c_scale,h_300/v1557824990/Brand%20Logo's/TN/Beer.jpg",
          genre_id: 4,
          brand_type_id: 3,
          offer_value: 0,
          is_on_pack: false,
          retailer_price: 80,
          price_type: "LABEL",
        },
      ],
      country_of_origin: "",
    },
    {
      brand_id: 1003,
      genre_id: 4,
      genre_name: "Beer",
      brand_name: "Kingfisher Select",
      high_res_image:
        "https://res.cloudinary.com/www-hipbar-com/image/upload/v1536029696/blank.png",
      low_res_image:
        "https://res.cloudinary.com/www-hipbar-com/image/upload/v1536029696/blank.png",
      logo_high_res_image:
        "https://res.cloudinary.com/www-hipbar-com/image/upload/c_scale,h_500/v1557824990/Brand%20Logo's/TN/Beer.jpg",
      logo_low_res_image:
        "https://res.cloudinary.com/www-hipbar-com/image/upload/c_scale,h_300/v1557824990/Brand%20Logo's/TN/Beer.jpg",
      promo_text: "",
      brand_type_id: 3,
      sku: [
        {
          sku_id: 3858,
          volume: 650,
          promo_text: "",
          price: 130,
          brand_id: 1003,
          brand_name: "Kingfisher Select",
          logo_low_res_image:
            "https://res.cloudinary.com/www-hipbar-com/image/upload/c_scale,h_300/v1557824990/Brand%20Logo's/TN/Beer.jpg",
          genre_id: 4,
          brand_type_id: 3,
          offer_value: 0,
          is_on_pack: false,
          retailer_price: 130,
          price_type: "LABEL",
        },
        {
          sku_id: 1290,
          volume: 325,
          promo_text: "",
          price: 70,
          brand_id: 1003,
          brand_name: "Kingfisher Select",
          logo_low_res_image:
            "https://res.cloudinary.com/www-hipbar-com/image/upload/c_scale,h_300/v1557824990/Brand%20Logo's/TN/Beer.jpg",
          genre_id: 4,
          brand_type_id: 3,
          offer_value: 0,
          is_on_pack: false,
          retailer_price: 70,
          price_type: "LABEL",
        },
      ],
      country_of_origin: "",
    },
    {
      brand_id: 838,
      genre_id: 4,
      genre_name: "Beer",
      brand_name: "British Empire Can",
      high_res_image:
        "https://res.cloudinary.com/www-hipbar-com/image/upload/v1536029696/blank.png",
      low_res_image:
        "https://res.cloudinary.com/www-hipbar-com/image/upload/v1536029696/blank.png",
      logo_high_res_image:
        "https://res.cloudinary.com/www-hipbar-com/image/upload/c_scale,h_500/v1557824990/Brand%20Logo's/TN/Beer.jpg",
      logo_low_res_image:
        "https://res.cloudinary.com/www-hipbar-com/image/upload/c_scale,h_300/v1557824990/Brand%20Logo's/TN/Beer.jpg",
      promo_text: "",
      brand_type_id: 3,
      sku: [
        {
          sku_id: 1086,
          volume: 500,
          promo_text: "",
          price: 120,
          brand_id: 838,
          brand_name: "British Empire Can",
          logo_low_res_image:
            "https://res.cloudinary.com/www-hipbar-com/image/upload/c_scale,h_300/v1557824990/Brand%20Logo's/TN/Beer.jpg",
          genre_id: 4,
          brand_type_id: 3,
          offer_value: 0,
          is_on_pack: false,
          retailer_price: 120,
          price_type: "LABEL",
        },
      ],
      country_of_origin: "UK",
    },
    {
      brand_id: 1156,
      genre_id: 4,
      genre_name: "Beer",
      brand_name: "British Empire Premium Beer",
      high_res_image:
        "https://res.cloudinary.com/www-hipbar-com/image/upload/v1536029696/blank.png",
      low_res_image:
        "https://res.cloudinary.com/www-hipbar-com/image/upload/v1536029696/blank.png",
      logo_high_res_image:
        "https://res.cloudinary.com/www-hipbar-com/image/upload/c_scale,h_500/v1557824990/Brand%20Logo's/TN/Beer.jpg",
      logo_low_res_image:
        "https://res.cloudinary.com/www-hipbar-com/image/upload/c_scale,h_500/v1557824990/Brand%20Logo's/TN/Beer.jpg",
      promo_text: "",
      brand_type_id: 3,
      sku: [
        {
          sku_id: 1430,
          volume: 650,
          promo_text: "",
          price: 150,
          brand_id: 1156,
          brand_name: "British Empire Premium Beer",
          logo_low_res_image:
            "https://res.cloudinary.com/www-hipbar-com/image/upload/c_scale,h_500/v1557824990/Brand%20Logo's/TN/Beer.jpg",
          genre_id: 4,
          brand_type_id: 3,
          offer_value: 0,
          is_on_pack: false,
          retailer_price: 150,
          price_type: "LABEL",
        },
      ],
      country_of_origin: "UK",
    },
    {
      brand_id: 842,
      genre_id: 4,
      genre_name: "Beer",
      brand_name: "British Empire Ultra Premium",
      high_res_image:
        "https://res.cloudinary.com/www-hipbar-com/image/upload/v1536029696/blank.png",
      low_res_image:
        "https://res.cloudinary.com/www-hipbar-com/image/upload/v1536029696/blank.png",
      logo_high_res_image:
        "https://res.cloudinary.com/www-hipbar-com/image/upload/c_scale,h_500/v1557824990/Brand%20Logo's/TN/Beer.jpg",
      logo_low_res_image:
        "https://res.cloudinary.com/www-hipbar-com/image/upload/c_scale,h_300/v1557824990/Brand%20Logo's/TN/Beer.jpg",
      promo_text: "",
      brand_type_id: 3,
      sku: [
        {
          sku_id: 1091,
          volume: 650,
          promo_text: "",
          price: 130,
          brand_id: 842,
          brand_name: "British Empire Ultra Premium",
          logo_low_res_image:
            "https://res.cloudinary.com/www-hipbar-com/image/upload/c_scale,h_300/v1557824990/Brand%20Logo's/TN/Beer.jpg",
          genre_id: 4,
          brand_type_id: 3,
          offer_value: 0,
          is_on_pack: false,
          retailer_price: 130,
          price_type: "LABEL",
        },
        {
          sku_id: 3947,
          volume: 500,
          promo_text: "",
          price: 120,
          brand_id: 842,
          brand_name: "British Empire Ultra Premium",
          logo_low_res_image:
            "https://res.cloudinary.com/www-hipbar-com/image/upload/c_scale,h_300/v1557824990/Brand%20Logo's/TN/Beer.jpg",
          genre_id: 4,
          brand_type_id: 3,
          offer_value: 0,
          is_on_pack: false,
          retailer_price: 120,
          price_type: "LABEL",
        },
        {
          sku_id: 1092,
          volume: 325,
          promo_text: "",
          price: 70,
          brand_id: 842,
          brand_name: "British Empire Ultra Premium",
          logo_low_res_image:
            "https://res.cloudinary.com/www-hipbar-com/image/upload/c_scale,h_300/v1557824990/Brand%20Logo's/TN/Beer.jpg",
          genre_id: 4,
          brand_type_id: 3,
          offer_value: 0,
          is_on_pack: false,
          retailer_price: 70,
          price_type: "LABEL",
        },
      ],
      country_of_origin: "UK",
    },
    {
      brand_id: 677,
      genre_id: 4,
      genre_name: "Beer",
      brand_name: "Carlsberg Elephant",
      high_res_image:
        "https://res.cloudinary.com/www-hipbar-com/image/upload/c_scale,h_900/v1534746626/Carlsberg%20India/SKU/Carlsberg_Elephant_Bottle.png",
      low_res_image:
        "https://res.cloudinary.com/www-hipbar-com/image/upload/c_scale,h_400/v1534746626/Carlsberg%20India/SKU/Carlsberg_Elephant_Bottle.png",
      logo_high_res_image:
        "https://res.cloudinary.com/www-hipbar-com/image/upload/c_scale,h_500/v1557824990/Brand%20Logo's/TN/Beer.jpg",
      logo_low_res_image:
        "https://res.cloudinary.com/www-hipbar-com/image/upload/c_scale,h_300/v1557824990/Brand%20Logo's/TN/Beer.jpg",
      promo_text: "",
      brand_type_id: 3,
      sku: [
        {
          sku_id: 839,
          volume: 650,
          promo_text: "",
          price: 150,
          brand_id: 677,
          brand_name: "Carlsberg Elephant",
          logo_low_res_image:
            "https://res.cloudinary.com/www-hipbar-com/image/upload/c_scale,h_300/v1557824990/Brand%20Logo's/TN/Beer.jpg",
          genre_id: 4,
          brand_type_id: 3,
          offer_value: 0,
          is_on_pack: false,
          retailer_price: 150,
          price_type: "LABEL",
        },
      ],
      country_of_origin: "",
    },
    {
      brand_id: 1100,
      genre_id: 4,
      genre_name: "Beer",
      brand_name: "SNJ 10000",
      high_res_image:
        "https://res.cloudinary.com/www-hipbar-com/image/upload/v1536029696/blank.png",
      low_res_image:
        "https://res.cloudinary.com/www-hipbar-com/image/upload/v1536029696/blank.png",
      logo_high_res_image:
        "https://res.cloudinary.com/www-hipbar-com/image/upload/c_scale,h_500/v1557824990/Brand%20Logo's/TN/Beer.jpg",
      logo_low_res_image:
        "https://res.cloudinary.com/www-hipbar-com/image/upload/c_scale,h_300/v1557824990/Brand%20Logo's/TN/Beer.jpg",
      promo_text: "",
      brand_type_id: 3,
      sku: [
        {
          sku_id: 1331,
          volume: 650,
          promo_text: "",
          price: 140,
          brand_id: 1100,
          brand_name: "SNJ 10000",
          logo_low_res_image:
            "https://res.cloudinary.com/www-hipbar-com/image/upload/c_scale,h_300/v1557824990/Brand%20Logo's/TN/Beer.jpg",
          genre_id: 4,
          brand_type_id: 3,
          offer_value: 0,
          is_on_pack: false,
          retailer_price: 140,
          price_type: "LABEL",
        },
        {
          sku_id: 3520,
          volume: 500,
          promo_text: "",
          price: 130,
          brand_id: 1100,
          brand_name: "SNJ 10000",
          logo_low_res_image:
            "https://res.cloudinary.com/www-hipbar-com/image/upload/c_scale,h_300/v1557824990/Brand%20Logo's/TN/Beer.jpg",
          genre_id: 4,
          brand_type_id: 3,
          offer_value: 0,
          is_on_pack: false,
          retailer_price: 130,
          price_type: "LABEL",
        },
      ],
      country_of_origin: "",
    },
    {
      brand_id: 1101,
      genre_id: 4,
      genre_name: "Beer",
      brand_name: "SNJ 20000",
      high_res_image:
        "https://res.cloudinary.com/www-hipbar-com/image/upload/v1536029696/blank.png",
      low_res_image:
        "https://res.cloudinary.com/www-hipbar-com/image/upload/v1536029696/blank.png",
      logo_high_res_image:
        "https://res.cloudinary.com/www-hipbar-com/image/upload/c_scale,h_500/v1557824990/Brand%20Logo's/TN/Beer.jpg",
      logo_low_res_image:
        "https://res.cloudinary.com/www-hipbar-com/image/upload/c_scale,h_300/v1557824990/Brand%20Logo's/TN/Beer.jpg",
      promo_text: "",
      brand_type_id: 3,
      sku: [
        {
          sku_id: 1333,
          volume: 650,
          promo_text: "",
          price: 130,
          brand_id: 1101,
          brand_name: "SNJ 20000",
          logo_low_res_image:
            "https://res.cloudinary.com/www-hipbar-com/image/upload/c_scale,h_300/v1557824990/Brand%20Logo's/TN/Beer.jpg",
          genre_id: 4,
          brand_type_id: 3,
          offer_value: 0,
          is_on_pack: false,
          retailer_price: 130,
          price_type: "LABEL",
        },
        {
          sku_id: 1332,
          volume: 500,
          promo_text: "",
          price: 120,
          brand_id: 1101,
          brand_name: "SNJ 20000",
          logo_low_res_image:
            "https://res.cloudinary.com/www-hipbar-com/image/upload/c_scale,h_300/v1557824990/Brand%20Logo's/TN/Beer.jpg",
          genre_id: 4,
          brand_type_id: 3,
          offer_value: 0,
          is_on_pack: false,
          retailer_price: 120,
          price_type: "LABEL",
        },
      ],
      country_of_origin: "",
    },
    {
      brand_id: 1103,
      genre_id: 4,
      genre_name: "Beer",
      brand_name: "SNJ 20000 Super Strong",
      high_res_image:
        "https://res.cloudinary.com/www-hipbar-com/image/upload/v1536029696/blank.png",
      low_res_image:
        "https://res.cloudinary.com/www-hipbar-com/image/upload/v1536029696/blank.png",
      logo_high_res_image:
        "https://res.cloudinary.com/www-hipbar-com/image/upload/c_scale,h_500/v1557824990/Brand%20Logo's/TN/Beer.jpg",
      logo_low_res_image:
        "https://res.cloudinary.com/www-hipbar-com/image/upload/c_scale,h_300/v1557824990/Brand%20Logo's/TN/Beer.jpg",
      promo_text: "",
      brand_type_id: 3,
      sku: [
        {
          sku_id: 1335,
          volume: 650,
          promo_text: "",
          price: 130,
          brand_id: 1103,
          brand_name: "SNJ 20000 Super Strong",
          logo_low_res_image:
            "https://res.cloudinary.com/www-hipbar-com/image/upload/c_scale,h_300/v1557824990/Brand%20Logo's/TN/Beer.jpg",
          genre_id: 4,
          brand_type_id: 3,
          offer_value: 0,
          is_on_pack: false,
          retailer_price: 130,
          price_type: "LABEL",
        },
        {
          sku_id: 3946,
          volume: 500,
          promo_text: "",
          price: 120,
          brand_id: 1103,
          brand_name: "SNJ 20000 Super Strong",
          logo_low_res_image:
            "https://res.cloudinary.com/www-hipbar-com/image/upload/c_scale,h_300/v1557824990/Brand%20Logo's/TN/Beer.jpg",
          genre_id: 4,
          brand_type_id: 3,
          offer_value: 0,
          is_on_pack: false,
          retailer_price: 120,
          price_type: "LABEL",
        },
      ],
      country_of_origin: "",
    },
    {
      brand_id: 824,
      genre_id: 4,
      genre_name: "Beer",
      brand_name: "Sterren Premium Quality Lager",
      high_res_image:
        "https://res.cloudinary.com/www-hipbar-com/image/upload/v1536029696/blank.png",
      low_res_image:
        "https://res.cloudinary.com/www-hipbar-com/image/upload/v1536029696/blank.png",
      logo_high_res_image:
        "https://res.cloudinary.com/www-hipbar-com/image/upload/c_scale,h_500/v1557824990/Brand%20Logo's/TN/Beer.jpg",
      logo_low_res_image:
        "https://res.cloudinary.com/www-hipbar-com/image/upload/c_scale,h_300/v1557824990/Brand%20Logo's/TN/Beer.jpg",
      promo_text: "",
      brand_type_id: 3,
      sku: [
        {
          sku_id: 1325,
          volume: 650,
          promo_text: "",
          price: 150,
          brand_id: 824,
          brand_name: "Sterren Premium Quality Lager",
          logo_low_res_image:
            "https://res.cloudinary.com/www-hipbar-com/image/upload/c_scale,h_300/v1557824990/Brand%20Logo's/TN/Beer.jpg",
          genre_id: 4,
          brand_type_id: 3,
          offer_value: 0,
          is_on_pack: false,
          retailer_price: 150,
          price_type: "LABEL",
        },
        {
          sku_id: 1073,
          volume: 500,
          promo_text: "",
          price: 130,
          brand_id: 824,
          brand_name: "Sterren Premium Quality Lager",
          logo_low_res_image:
            "https://res.cloudinary.com/www-hipbar-com/image/upload/c_scale,h_300/v1557824990/Brand%20Logo's/TN/Beer.jpg",
          genre_id: 4,
          brand_type_id: 3,
          offer_value: 0,
          is_on_pack: false,
          retailer_price: 130,
          price_type: "LABEL",
        },
        {
          sku_id: 1071,
          volume: 325,
          promo_text: "",
          price: 80,
          brand_id: 824,
          brand_name: "Sterren Premium Quality Lager",
          logo_low_res_image:
            "https://res.cloudinary.com/www-hipbar-com/image/upload/c_scale,h_300/v1557824990/Brand%20Logo's/TN/Beer.jpg",
          genre_id: 4,
          brand_type_id: 3,
          offer_value: 0,
          is_on_pack: false,
          retailer_price: 80,
          price_type: "LABEL",
        },
      ],
      country_of_origin: "",
    },
    {
      brand_id: 673,
      genre_id: 4,
      genre_name: "Beer",
      brand_name: "Tuborg Strong",
      high_res_image:
        "https://res.cloudinary.com/www-hipbar-com/image/upload/c_scale,h_900/v1534746638/Carlsberg%20India/SKU/Tuborg_Strong_Bottle.png",
      low_res_image:
        "https://res.cloudinary.com/www-hipbar-com/image/upload/c_scale,h_400/v1534746638/Carlsberg%20India/SKU/Tuborg_Strong_Bottle.png",
      logo_high_res_image:
        "https://res.cloudinary.com/www-hipbar-com/image/upload/c_scale,h_500/v1557824990/Brand%20Logo's/TN/Beer.jpg",
      logo_low_res_image:
        "https://res.cloudinary.com/www-hipbar-com/image/upload/c_scale,h_300/v1557824990/Brand%20Logo's/TN/Beer.jpg",
      promo_text: "",
      brand_type_id: 3,
      sku: [
        {
          sku_id: 835,
          volume: 650,
          promo_text: "",
          price: 150,
          brand_id: 673,
          brand_name: "Tuborg Strong",
          logo_low_res_image:
            "https://res.cloudinary.com/www-hipbar-com/image/upload/c_scale,h_300/v1557824990/Brand%20Logo's/TN/Beer.jpg",
          genre_id: 4,
          brand_type_id: 3,
          offer_value: 0,
          is_on_pack: false,
          retailer_price: 150,
          price_type: "LABEL",
        },
        {
          sku_id: 1918,
          volume: 330,
          promo_text: "",
          price: 80,
          brand_id: 673,
          brand_name: "Tuborg Strong",
          logo_low_res_image:
            "https://res.cloudinary.com/www-hipbar-com/image/upload/c_scale,h_300/v1557824990/Brand%20Logo's/TN/Beer.jpg",
          genre_id: 4,
          brand_type_id: 3,
          offer_value: 0,
          is_on_pack: false,
          retailer_price: 80,
          price_type: "LABEL",
        },
      ],
      country_of_origin: "",
    },
    {
      brand_id: 1050,
      genre_id: 4,
      genre_name: "Beer",
      brand_name: "Leon",
      high_res_image:
        "https://res.cloudinary.com/www-hipbar-com/image/upload/v1536029696/blank.png",
      low_res_image:
        "https://res.cloudinary.com/www-hipbar-com/image/upload/v1536029696/blank.png",
      logo_high_res_image:
        "https://res.cloudinary.com/www-hipbar-com/image/upload/c_scale,h_500/v1557824990/Brand%20Logo's/TN/Beer.jpg",
      logo_low_res_image:
        "https://res.cloudinary.com/www-hipbar-com/image/upload/c_scale,h_300/v1557824990/Brand%20Logo's/TN/Beer.jpg",
      promo_text: "",
      brand_type_id: 3,
      sku: [
        {
          sku_id: 1297,
          volume: 330,
          promo_text: "",
          price: 240,
          brand_id: 1050,
          brand_name: "Leon",
          logo_low_res_image:
            "https://res.cloudinary.com/www-hipbar-com/image/upload/c_scale,h_300/v1557824990/Brand%20Logo's/TN/Beer.jpg",
          genre_id: 4,
          brand_type_id: 3,
          offer_value: 0,
          is_on_pack: false,
          retailer_price: 240,
          price_type: "LABEL",
        },
      ],
      country_of_origin: "",
    },
    {
      brand_id: 11,
      genre_id: 4,
      genre_name: "Beer",
      brand_name: "Stella Artois",
      high_res_image: "",
      low_res_image: "",
      logo_high_res_image:
        "https://res.cloudinary.com/www-hipbar-com/image/upload/v1553255811/Brand%20Logo's/AB%20Inbev/Stella_Artois.jpg",
      logo_low_res_image:
        "https://res.cloudinary.com/www-hipbar-com/image/upload/c_scale,h_300/v1553255811/Brand%20Logo's/AB%20Inbev/Stella_Artois.jpg",
      promo_text: "",
      brand_type_id: 3,
      sku: [
        {
          sku_id: 9,
          volume: 330,
          promo_text: "",
          price: 310,
          brand_id: 11,
          brand_name: "Stella Artois",
          logo_low_res_image:
            "https://res.cloudinary.com/www-hipbar-com/image/upload/c_scale,h_300/v1553255811/Brand%20Logo's/AB%20Inbev/Stella_Artois.jpg",
          genre_id: 4,
          brand_type_id: 3,
          offer_value: 0,
          is_on_pack: false,
          retailer_price: 310,
          price_type: "LABEL",
        },
      ],
      country_of_origin: "Belgium",
    },
    {
      brand_id: 13,
      genre_id: 4,
      genre_name: "Beer",
      brand_name: "Hoegaarden",
      high_res_image: "",
      low_res_image: "",
      logo_high_res_image:
        "https://res.cloudinary.com/www-hipbar-com/image/upload/v1553255716/Brand%20Logo's/AB%20Inbev/Hoegaarden.jpg",
      logo_low_res_image:
        "https://res.cloudinary.com/www-hipbar-com/image/upload/c_scale,h_300/v1553255716/Brand%20Logo's/AB%20Inbev/Hoegaarden.jpg",
      promo_text: "",
      brand_type_id: 3,
      sku: [
        {
          sku_id: 11,
          volume: 330,
          promo_text: "",
          price: 330,
          brand_id: 13,
          brand_name: "Hoegaarden",
          logo_low_res_image:
            "https://res.cloudinary.com/www-hipbar-com/image/upload/c_scale,h_300/v1553255716/Brand%20Logo's/AB%20Inbev/Hoegaarden.jpg",
          genre_id: 4,
          brand_type_id: 3,
          offer_value: 0,
          is_on_pack: false,
          retailer_price: 330,
          price_type: "LABEL",
        },
      ],
      country_of_origin: "Belgium",
    },
    {
      brand_id: 15,
      genre_id: 4,
      genre_name: "Beer",
      brand_name: "Budweiser Premium King of Beers",
      high_res_image:
        "https://res.cloudinary.com/www-hipbar-com/image/upload/c_scale,h_900/v1528879128/AB%20INBEV/SKU/Budweiser_650.jpg",
      low_res_image:
        "https://res.cloudinary.com/www-hipbar-com/image/upload/c_scale,h_400/v1528879128/AB%20INBEV/SKU/Budweiser_650.jpg",
      logo_high_res_image:
        "https://res.cloudinary.com/www-hipbar-com/image/upload/v1553255597/Brand%20Logo's/AB%20Inbev/Budweiser.jpg",
      logo_low_res_image:
        "https://res.cloudinary.com/www-hipbar-com/image/upload/c_scale,h_300/v1553255597/Brand%20Logo's/AB%20Inbev/Budweiser.jpg",
      promo_text: "",
      brand_type_id: 3,
      sku: [
        {
          sku_id: 980,
          volume: 330,
          promo_text: "",
          price: 160,
          brand_id: 15,
          brand_name: "Budweiser Premium King of Beers",
          logo_low_res_image:
            "https://res.cloudinary.com/www-hipbar-com/image/upload/c_scale,h_300/v1553255597/Brand%20Logo's/AB%20Inbev/Budweiser.jpg",
          genre_id: 4,
          brand_type_id: 3,
          offer_value: 0,
          is_on_pack: false,
          retailer_price: 160,
          price_type: "LABEL",
        },
      ],
      country_of_origin: "India",
    },
    {
      brand_id: 307,
      genre_id: 4,
      genre_name: "Beer",
      brand_name: "Corona Extra",
      high_res_image:
        "https://res.cloudinary.com/www-hipbar-com/image/upload/c_scale,h_900/v1521629587/AB%20INBEV/SKU/Corona_Extra.jpg",
      low_res_image:
        "https://res.cloudinary.com/www-hipbar-com/image/upload/c_scale,h_400/v1521629587/AB%20INBEV/SKU/Corona_Extra.jpg",
      logo_high_res_image:
        "https://res.cloudinary.com/www-hipbar-com/image/upload/v1553255661/Brand%20Logo's/AB%20Inbev/Corona_Extra.jpg",
      logo_low_res_image:
        "https://res.cloudinary.com/www-hipbar-com/image/upload/c_scale,h_300/v1553255661/Brand%20Logo's/AB%20Inbev/Corona_Extra.jpg",
      promo_text: "",
      brand_type_id: 3,
      sku: [
        {
          sku_id: 386,
          volume: 330,
          promo_text: "",
          price: 270,
          brand_id: 307,
          brand_name: "Corona Extra",
          logo_low_res_image:
            "https://res.cloudinary.com/www-hipbar-com/image/upload/c_scale,h_300/v1553255661/Brand%20Logo's/AB%20Inbev/Corona_Extra.jpg",
          genre_id: 4,
          brand_type_id: 3,
          offer_value: 0,
          is_on_pack: false,
          retailer_price: 270,
          price_type: "LABEL",
        },
      ],
      country_of_origin: "Mexico",
    },
    {
      brand_id: 458,
      genre_id: 4,
      genre_name: "Beer",
      brand_name: "Edelweiss",
      high_res_image:
        "https://res.cloudinary.com/www-hipbar-com/image/upload/c_scale,h_900/v1526386536/United%20Breweries/Heineken%20SKU/Edelweiss.jpg",
      low_res_image:
        "https://res.cloudinary.com/www-hipbar-com/image/upload/c_scale,h_400/v1526386536/United%20Breweries/Heineken%20SKU/Edelweiss.jpg",
      logo_high_res_image:
        "https://res.cloudinary.com/www-hipbar-com/image/upload/c_scale,h_500/v1557824990/Brand%20Logo's/TN/Beer.jpg",
      logo_low_res_image:
        "https://res.cloudinary.com/www-hipbar-com/image/upload/c_scale,h_300/v1557824990/Brand%20Logo's/TN/Beer.jpg",
      promo_text: "",
      brand_type_id: 3,
      sku: [
        {
          sku_id: 547,
          volume: 330,
          promo_text: "",
          price: 300,
          brand_id: 458,
          brand_name: "Edelweiss",
          logo_low_res_image:
            "https://res.cloudinary.com/www-hipbar-com/image/upload/c_scale,h_300/v1557824990/Brand%20Logo's/TN/Beer.jpg",
          genre_id: 4,
          brand_type_id: 3,
          offer_value: 0,
          is_on_pack: false,
          retailer_price: 300,
          price_type: "LABEL",
        },
      ],
      country_of_origin: "",
    },
    {
      brand_id: 459,
      genre_id: 4,
      genre_name: "Beer",
      brand_name: "Dos Equis",
      high_res_image:
        "https://res.cloudinary.com/www-hipbar-com/image/upload/c_scale,h_900/v1526386536/United%20Breweries/Heineken%20SKU/Dos_Equis.jpg",
      low_res_image:
        "https://res.cloudinary.com/www-hipbar-com/image/upload/c_scale,h_400/v1526386536/United%20Breweries/Heineken%20SKU/Dos_Equis.jpg",
      logo_high_res_image:
        "https://res.cloudinary.com/www-hipbar-com/image/upload/c_scale,h_500/v1557824990/Brand%20Logo's/TN/Beer.jpg",
      logo_low_res_image:
        "https://res.cloudinary.com/www-hipbar-com/image/upload/c_scale,h_300/v1557824990/Brand%20Logo's/TN/Beer.jpg",
      promo_text: "",
      brand_type_id: 3,
      sku: [
        {
          sku_id: 548,
          volume: 330,
          promo_text: "",
          price: 220,
          brand_id: 459,
          brand_name: "Dos Equis",
          logo_low_res_image:
            "https://res.cloudinary.com/www-hipbar-com/image/upload/c_scale,h_300/v1557824990/Brand%20Logo's/TN/Beer.jpg",
          genre_id: 4,
          brand_type_id: 3,
          offer_value: 0,
          is_on_pack: false,
          retailer_price: 220,
          price_type: "LABEL",
        },
      ],
      country_of_origin: "",
    },
  ],
};

export { kycDetailsMockData, listGenre, listBrand, deliveryOrderReasons };
