

       const binaryOptions = [
        {name: 'ندارد ', value: 0},
        {name: 'دارد', value: 1},
    ];

    const optionFamilySupervisor = [
        {name: 'بلی ', value: true},
        {name: 'خیر', value: false},
    ];
    const genderoptions = [
        {name: ' مرد', value: false},
        {name: 'زن', value: true},
    ];
    const options = [
        {name: 'شهری', value: 1},
        {name: 'روستایی', value: 2},
    ];
    const optionmaritalStatus = [
        {name: 'مجرد', value: false},
        {name: 'متاهل', value: true},
    ];
    const genders= [
        {
            key: 0,
            value: "مرد",
            "parentKey": null
        },
        {
            key: 1,
            value: "زن",
            "parentKey": null
        }
    ]
    const ownerTypes= [
        {
            key: 1,
            value: "شخصی",
            "parentKey": null
        },
        {
            key: 2,
            value: "استیجاری",
            "parentKey": null
        },
        {
            key: 3,
            value: "شراکتی",
            "parentKey": null
        }
    ]
    const cartableStatusTypes= [
        {
            key: 1,
            value: "ارجاع-در انتظار نظارت",
            "parentKey": null
        },
        {
            key: 2,
            value: "نظارت شده",
            "parentKey": null
        },
        {
            key: 3,
            value: "تحویل سیستمی-عدم انجام نظارت",
            "parentKey": null
        },
        {
            key: 4,
            value: "محاسبه شده",
            "parentKey": null
        },
        {
            key: 5,
            value: "حذف محاسبه",
            "parentKey": null
        }
    ]
    const equipmentTypes= [
        {
            key: 1,
            value: "جدید و نو",
            "parentKey": null
        },
        {
            key: 2,
            value: "کارکرده و دست دوم",
            "parentKey": null
        },
        {
            key: 3,
            value: "بخشی نو و بخشی کارکرده",
            "parentKey": null
        }
    ]
    const livestockTypes= [
        {
            key: 1,
            value: "گاو",
            "parentKey": null
        },
        {
            key: 2,
            value: "گوسفند و بز",
            "parentKey": null
        },
        {
            key: 3,
            value: "ماهی",
            "parentKey": null
        },
        {
            key: 4,
            value: "ماکیان",
            "parentKey": null
        },
        {
            key: 5,
            value: "شترمرغ",
            "parentKey": null
        },
        {
            key: 6,
            value: "زنبور",
            "parentKey": null
        },
        {
            key: 7,
            value: "شتر",
            "parentKey": null
        },
        {
            key: 8,
            value: "اسب",
            "parentKey": null
        },
        {
            key: 9,
            value: "سایر",
            "parentKey": null
        }
    ]
    const  loanSurveyEconomicTypes= [
        {
            key: 1,
            value: "دامپروری",
            "parentKey": null
        },
        {
            key: 2,
            value: "باغی زراعی",
            "parentKey": null
        },
        {
            key: 3,
            value: "خدمات",
            "parentKey": null
        },
        {
            key: 4,
            value: "صنعتی",
            "parentKey": null
        }
    ]
    const maritalStatusTypes= [
        {
            key: 0,
            value: "مجرد",
            "parentKey": null
        },
        {
            key: 1,
            value: "متاهل",
            "parentKey": null
        }
    ]
    const  planActivationTypes= [
        {
            key: 1,
            value: "فعال",
            "parentKey": null
        },
        {
            key: 2,
            value: "غیر فعال",
            "parentKey": null
        },
        {
            key: 3,
            value: "مهلت جهت انجام تعهدات",
            "parentKey": null
        }
    ]
    const  planTypes=[
        {
            key: 1,
            value: "خانگی",
            "parentKey": null
        },
        {
            key: 2,
            value: "خویش فرمایی",
            "parentKey": null
        },
        {
            key: 3,
            value: "کارفرمایی و کارآفرینی",
            "parentKey": null
        },
        {
            key: 4,
            value: "تعاونی",
            "parentKey": 3
        },
        {
            key: 5,
            value: "برند",
            "parentKey": 3
        },
        {
            key: 6,
            value: "پشتیبان",
            "parentKey": 3
        },
        {
            key: 7,
            value: "خوشه",
            "parentKey": 3
        },
        {
            key: 8,
            value: "تفاهم نامه مشارکتی",
            "parentKey": 3
        },
        {
            key: 9,
            value: "تفاهم نامه غیرمشارکتی",
            "parentKey": 3
        },
        {
            key: 10,
            value: "کارفرمایی",
            "parentKey": 3
        },
        {
            key: 11,
            value: "خانگی",
            "parentKey": 1
        },
        {
            key: 12,
            value: "خویش فرمایی",
            "parentKey": 2
        },
        {
            key: 13,
            value: "صندوق های خرد محلی",
            "parentKey": null
        },
        {
            key: 14,
            value: "هر روستا یک محصول",
            "parentKey": null
        },
        {
            key: 15,
            value: "روستای بدون بیکار",
            "parentKey": null
        }
    ]
    const  residentTypes= [
        {
            key: 1,
            value: "شهری",
            "parentKey": null
        },
        {
            key: 2,
            value: "روستایی",
            "parentKey": null
        }
    ]
    const  presenceTypes= [
        {
            key: 1,
            value: "ثابت",
            "parentKey": null
        },
        {
            key: 2,
            value: "موقت",
            "parentKey": null
        },
        {
            key: 3,
            value: "عدم حضور",
            "parentKey": null
        }
    ]
    const   productTypes= [
        {
            key: 1,
            value: "زراعی",
            "parentKey": null
        },
        {
            key: 2,
            value: "باغی",
            "parentKey": null
        }
    ]
    const   educationTypes= [
        {
            key: 1,
            value: "نامشخص",
            "parentKey": null
        },
        {
            key: 2,
            value: "بی سواد",
            "parentKey": null
        },
        {
            key: 3,
            value: "سیکل",
            "parentKey": null
        },
        {
            key: 4,
            value: "زیر دیپلم",
            "parentKey": null
        },
        {
            key: 5,
            value: "دیپلم",
            "parentKey": null
        },
        {
            key: 6,
            value: "فوق دیپلم",
            "parentKey": null
        },
        {
            key: 7,
            value: "کارشناسی",
            "parentKey": null
        },
        {
            key: 8,
            value: "کارشناسی ارشد",
            "parentKey": null
        },
        {
            key: 9,
            value: "دکتری",
            "parentKey": null
        }
    ]
    const  economicTypes= [
        {
            key: 1,
            value: "کشاورزي",
            "parentKey": null
        },
        {
            key: 2,
            value: "ضروري و رفاهي",
            "parentKey": null
        },
        {
            key: 3,
            value: "صنعت",
            "parentKey": null
        },
        {
            key: 4,
            value: "خدمات",
            "parentKey": null
        },
        {
            key: 5,
            value: "نمايندگان مجلس",
            "parentKey": null
        },
        {
            key: 9,
            value: "تعمير مسکن",
            "parentKey": null
        },
        {
            key: 10,
            value: "متفرقه",
            "parentKey": null
        },
        {
            key: 11,
            value: "تامين مسکن",
            "parentKey": null
        },
        {
            key: 12,
            value: "سایر",
            "parentKey": null
        }
    ]
    const insuranceTypes= [
        {
            key: 1,
            value: "تامین اجتماعی",
            "parentKey": null
        },
        {
            key: 2,
            value: "روستایی عشاری",
            "parentKey": null
        }
    ]
    const optionsEquipmentBought = [
           {name: 'خریداری شده  ', value: 1},
           {name: 'خریداری نشده', value: 0},
           {name: 'تجهیزات ندارد', value: 2},
       ];


const exportedObjects = {
    optionmaritalStatus,
    options,
    genderoptions,
    optionFamilySupervisor,
    maritalStatusTypes,
    cartableStatusTypes,
    genders,
    ownerTypes,
    livestockTypes,
    loanSurveyEconomicTypes,
    equipmentTypes,
    planTypes,
    residentTypes,
    presenceTypes,
    productTypes,
    educationTypes,
    economicTypes,
    insuranceTypes,
    planActivationTypes,
    binaryOptions,
    optionsEquipmentBought
}

export default exportedObjects;
