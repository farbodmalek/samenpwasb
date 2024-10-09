export default class {

    static optionsPresence = ref([
        {name: 'ندارد ', value: 0},
        {name: 'دارد', value: 1},
    ]);

    static optionsInsurance = ref([
        {name: 'ندارد ', value: 0},
        {name: 'دارد', value: 1},
    ]);
    static optionsInsurance1 = ref([
        {name: 'ندارد ', value: 0},
        {name: 'دارد', value: 1},
    ]);

    static optionsLivestockBooklet = ref([
        {name: 'ندارد ', value: 0},
        {name: 'دارد', value: 1},
    ]);

    static optionFamilySupervisor = ref([
        {name: 'بلی ', value: true},
        {name: 'خیر', value: false},
    ]);

    static genderoptions = ref([
        {name: ' مرد', value: false},
        {name: 'زن', value: true},
    ]);

    static options = ref([
        {name: 'شهری', value: 1},
        {name: 'روستایی', value: 2},
    ]);

    static optionmaritalStatus = ref([
        {name: 'مجرد', value: false},
        {name: 'متاهل', value: true},
    ]);

}