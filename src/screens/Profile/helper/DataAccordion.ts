import { Masks } from "react-native-mask-input"
import enums from "./enums"
import { TranslateEnum } from "./translateEnum"

const phoneMask = ["(", /\d/, /\d/, ") ", /\d/, /\d/, /\d/, /\d/, "-", /\d/, /\d/, /\d/, /\d/];

export namespace DataAccordion {
  export function getData(person:any, data:string):any {
    const basicData = [
      {
        id: 'A1',
        type: 'input',
        inputType: null,
        mask: null,
        label: 'Nome completo',
        question: 'Nome completo',
        attribute: 'name',
        value: person?.name,
        options: null,
        getValue: TranslateEnum.getValue(person?.name)
      },
      {
        id: 'A2',
        type: 'checkbox',
        inputType: null,
        mask: null,
        label: 'Sexo',
        question: 'Sexo',
        attribute: 'gender',
        value: person?.gender,
        options: enums.genderList,
        getValue: TranslateEnum.gender(person?.gender)
      },
      {
        id: 'A3',
        type: 'date',
        inputType: null,
        mask: null,
        label: 'Data de nascimento',
        question: 'Data de nascimento',
        attribute: 'dateBirth',
        value: person?.dateBirth,
        options: null,
        getValue: TranslateEnum.getDate(person?.dateBirth)
      },
      {
        id: 'A4',
        type: 'checkbox',
        inputType: null,
        mask: null,
        label: 'Estado civil',
        question: 'Estado civil',
        attribute: 'maritalStatus',
        value: person?.maritalStatus,
        options: enums.maritalStatusList,
        getValue: TranslateEnum.maritalStatus(person?.maritalStatus)
      },
    ]

    const contactData = [
      {
        id: 'B1',
        type: 'address',
        inputType: null,
        mask: null,
        label: 'Endereço',
        question: 'Endereço',
        attribute: 'address',
        value: person?.address,
        options: null,
        getValue: TranslateEnum.address(person?.address)
      },
      {
        id: 'B2',
        type: 'input',
        inputType: null,
        mask: null,
        label: 'E-mail',
        question: 'E-mail',
        attribute: 'email',
        value: person?.email,
        options: null,
        getValue: TranslateEnum.getValue(person?.email)
      },
      {
        id: 'B3',
        type: 'input',
        inputType: 'numeric',
        mask: Masks.BRL_PHONE,
        label: 'Celular',
        question: 'Celular',
        attribute: 'cellPhone',
        value: person?.cellPhone,
        options: null,
        getValue: TranslateEnum.getValue(person?.cellPhone)
      },
      {
        id: 'B4',
        type: 'input',
        inputType: 'numeric',
        mask: phoneMask,
        label: 'Telefone',
        question: 'Telefone',
        attribute: 'phone',
        value: person?.phone,
        options: null,
        getValue: TranslateEnum.getValue(person?.phone)
      },
    ]
  
    const churchData = [
      {
        id: 'C1',
        type: 'checkbox',
        inputType: null,
        mask: null,
        label: 'Igreja local',
        question: 'Qual a igreja você frequenta ou deseja frequentar?',
        attribute: 'localChurch',
        value: person?.localChurch,
        options: enums.churchList,
        getValue: TranslateEnum.church(person?.localChurch)
      },
      {
        id: 'C2',
        type: 'checkbox',
        inputType: null,
        mask: null,
        label: 'Relação com a igreja',
        question: 'Como você caracteriza sua relação com a igreja?',
        attribute: 'relationshipChurch',
        value: person?.relationshipChurch,
        options: enums.characteristicList,
        getValue: TranslateEnum.characteristic(person?.relationshipChurch)
      },
      {
        id: 'C3',
        type: 'date',
        inputType: null,
        mask: null,
        label: 'Data da entrada',
        question: 'Quando começou a frequentar/visitar a igreja?',
        attribute: 'entryDate',
        value: person?.entryDate,
        options: null,
        getValue: TranslateEnum.getDate(person?.entryDate),
      },
      {
        id: 'C4',
        type: 'checkbox',
        inputType: null,
        mask: null,
        label: 'Entrada por',
        question: 'Como você entrou na igreja?',
        attribute: 'entryBy',
        value: person?.entryBy,
        options: enums.entranceToThechurchList,
        getValue: TranslateEnum.entranceToThechurchList(person?.entryBy)
      },
      {
        id: 'C5',
        type: 'input',
        inputType: null,
        mask: null,
        label: 'Igreja de onde veio',
        question: 'De qual igreja você se transferiu?',
        attribute: 'cameFrom',
        value: person?.cameFrom,
        options: null,
        getValue: TranslateEnum.getValue(person?.cameFrom)
      },
      {
        id: 'C6',
        type: 'checkbox',
        inputType: null,
        mask: null,
        label: 'Você já se batizou?',
        question: 'Você já se batizou?',
        attribute: 'baptized',
        value: person?.baptized,
        options: enums.booleanList,
        getValue: TranslateEnum.getBoolean(person?.baptized)
      },
      {
        id: 'C7',
        type: 'checkbox',
        inputType: null,
        mask: null,
        label: 'Aceitou a Jesus?',
        question: 'Aceitou a Jesus?',
        attribute: 'acceptedJesus',
        value: person?.acceptedJesus,
        options: enums.booleanList,
        getValue: TranslateEnum.getBoolean(person?.acceptedJesus)
      },
      {
        id: 'C8',
        type: 'checkbox',
        inputType: null,
        mask: null,
        label: 'É lider?',
        question: 'Você tem alguma posição de liderança na igreja?',
        attribute: 'leader',
        value: person?.leader,
        options: enums.booleanList,
        getValue: TranslateEnum.getBoolean(person?.leader)
      },
      {
        id: 'C9',
        type: 'checkbox',
        inputType: null,
        mask: null,
        label: 'É pastor?',
        question: 'É pastor?',
        attribute: 'pastor',
        value: person?.pastor,
        options: enums.booleanList,
        getValue: TranslateEnum.getBoolean(person?.pastor)
      },
    ]

    switch(data) {
      case 'BASIC': return basicData;
      case 'CONTACT': return contactData;
      case 'CHURCH': return churchData;
    }
  }
}