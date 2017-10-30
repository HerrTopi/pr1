import { fromJS } from "immutable";
export const initialState = fromJS({
  paired: {
    keys: ["deficitName", "deficitBarcode", "excessName", "excessSideNote"],
    header: {
      deficitName: "Hiány név",
      deficitBarcode: "Hiány vonalkód",
      excessName: "Többlet Név",
      excessSideNote: "Többlet megjegyzés"
    },
    data: [
      {
        id: 1,
        deficitName: "asd1",
        deficitBarcode: "asd2",
        excessName: "asd3",
        excessSideNote: "asd4"
      },
      {
        id: 2,
        deficitName: "asd1",
        deficitBarcode: "asd2",
        excessName: "asd3",
        excessSideNote: "asd4"
      },
      {
        id: 3,
        deficitName: "asd1",
        deficitBarcode: "asd2",
        excessName: "asd3",
        excessSideNote: "asd4"
      },
      {
        id: 4,
        deficitName: "asd1",
        deficitBarcode: "asd2",
        excessName: "asd3",
        excessSideNote: "asd4"
      }
    ]
  },
  excess: {
    keys: [
      "barcode",
      "oldBarcode",
      "factoryNumber",
      "itemNumber",
      "name",
      "building",
      "room",
      "activationDate",
      "classTag",
      "firm",
      "address",
      "sidenote",
      "time",
      "personalNumber",
      "anotherSidenote"
    ],
    header: {
      barcode: "vonalkód",
      oldBarcode: "régi vonalkód",
      factoryNumber: "gyáriszám",
      itemNumber: "termékszám",
      name: "megnevezés",
      building: "épület",
      room: "szoba",
      activationDate: "aktiválási dátum",
      classTag: "osztály",
      firm: "vállalat",
      address: "cím",
      sidenote: "megjegyzés",
      time: "felvételi idő",
      personalNumber: "személyi szám",
      anotherSidenote: "párosító megjegyzés"
    },
    data: [
      {
        id: 22,
        barcode: "11111111111111111111",
        oldBarcode: "123",
        factoryNumber: "123",
        itemNumber: "123",
        name: "asd",
        building: "asd",
        room: "asd",
        activationDate: "2017-08-01T22:00:00.000Z",
        classTag: "1",
        firm: "gsch",
        address: "PL24",
        sidenote: "adasdasdasdasdasdas",
        time: "1503764409609",
        personalNumber: "123",
        anotherSidenote: "bbbbbbbbbbbbbbb",
        pair: 423,
        __v: 0
      },
      {
        id: 23,
        barcode: "222222222222222",
        oldBarcode: "123",
        factoryNumber: "123",
        itemNumber: "123",
        name: "asd",
        building: "asd",
        room: "asd",
        activationDate: "2017-08-01T22:00:00.000Z",
        classTag: "1",
        firm: "gsch",
        address: "PL24",
        sidenote: "adasdasdasdasdasdas",
        time: "1503764409609",
        personalNumber: "123",
        anotherSidenote: "bbbbbbbbbbbbbbb",
        pair: -1,
        __v: 0
      }
    ]
  },

  deficit: {
    keys: [
      "FIELD1",
      "FIELD2",
      "FIELD3",
      "FIELD4",
      "FIELD5",
      "FIELD6",
      "FIELD7",
      "FIELD8",
      "FIELD9",
      "FIELD10",
      "FIELD11",
      "FIELD12",
      "FIELD13",
      "FIELD14",
      "FIELD15",
      "FIELD16",
      "FIELD17",
      "FIELD18",
      "FIELD19",
      "FIELD20",
      "FIELD21"
    ],
    header: {
      FIELD1: "Eszköz Megn.",
      FIELD2: "Vállalat",
      FIELD3: "Eszköz sz.",
      FIELD4: "Vonalkód",
      FIELD5: "Régi Vonalkód",
      FIELD6: "Ktgh",
      FIELD7: "Osztály",
      FIELD8: "Státuszkód",
      FIELD9: "Eszköz Megn.2",
      FIELD10: "Megjegyzés",
      FIELD11: "Gyári szám",
      FIELD12: "Személy Kód",
      FIELD13: "Fölérend sz",
      FIELD14: "Épület",
      FIELD15: "Helyiség",
      FIELD16: "Besz. érték",
      FIELD17: "Kumm. ÉCS",
      FIELD18: "Könyv. sz. ért.",
      FIELD19: "Nem tudom1",
      FIELD20: "Nem tudom2",
      FIELD21: "Nem tudom3"
    },
    data: []
  }
});
