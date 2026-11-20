const CATEGORY_CONFIG = [
  { name: "Lohn", color: "#4dd8d0", background: "rgba(77, 216, 208, 0.13)", match: /Neckartal Logistik/i },
  { name: "Eltern", color: "#65c8df", background: "rgba(101, 200, 223, 0.13)", match: /Mueller, Thomas/i },
  { name: "Miete", color: "#92b8f5", background: "rgba(146, 184, 245, 0.14)", match: /Schneider, Katrin/i },
  { name: "Abos & Verträge", color: "#82a9ef", background: "rgba(130, 169, 239, 0.14)", match: /Spotify|Netflix|Telefonica|DB Vertrieb/i },
  { name: "Supermarkt", color: "#6d9de8", background: "rgba(109, 157, 232, 0.14)", match: /REWE|Lidl|ALDI|EDEKA|Kaufland/i },
  { name: "Mensa", color: "#82c5eb", background: "rgba(130, 197, 235, 0.14)", match: /Studierendenwerk/i },
  { name: "Drogerie", color: "#79b5d8", background: "rgba(121, 181, 216, 0.14)", match: /dm|Rossmann/i },
  { name: "Bargeld", color: "#7890b2", background: "rgba(120, 144, 178, 0.15)", match: /Kreissparkasse/i },
  { name: "Online-Shopping", color: "#5c95f5", background: "rgba(92, 149, 245, 0.14)", match: /PayPal|AMAZON/i },
  { name: "Uni", color: "#6abbd3", background: "rgba(106, 187, 211, 0.14)", match: /Universitaet/i },
  { name: "Versicherung", color: "#5cb9bc", background: "rgba(92, 185, 188, 0.14)", match: /Neckar Direkt/i },
  { name: "Freunde", color: "#91b5e7", background: "rgba(145, 181, 231, 0.14)", match: /Lena Hoffmann|Jonas Weber/i },
  { name: "Freizeit & Essen", color: "#8299c0", background: "rgba(130, 153, 192, 0.14)", match: /.*/ }
];

const START_SALDO = 850;
const RAW_CSV = `Datum;Empfänger/Auftraggeber;Verwendungszweck;Betrag;Kontostand
01.01.2026;Schneider, Katrin;DAUERAUFTRAG Miete Zimmer WG 01/2026 inkl. NK;-420,00;430,00
02.01.2026;DB Vertrieb GmbH;Deutschlandticket 01.2026 Abo-Nr. 48302917 MREF: DT-0048302917 CRED: DE25ZZZ00000007758;-63,00;367,00
02.01.2026;Lidl Vertriebs GmbH & Co. KG;Kartenzahlung girocard 02.01.2026 09:52 Terminal-Nr. 64979640 LIDL DIENSTLEISTUNG;-56,85;310,15
05.01.2026;Mueller, Thomas;DAUERAUFTRAG Unterstuetzung 01/2026;300,00;610,15
05.01.2026;Telefonica Germany GmbH + Co. OHG;Kd-Nr. 7140382266 Rechnung 01/2026 MREF: 1EXN73KQ2WP9 CRED: DE26ZZZ00000031258;-12,99;597,16
05.01.2026;Rossmann;Kartenzahlung girocard 05.01.2026 19:25 Terminal-Nr. 68174896 ROSSMANN 2213;-8,62;588,54
06.01.2026;Kreissparkasse Tuebingen;Bargeldauszahlung GA 06.01.2026 19:18 Terminal-Nr. 60577582 KSK TUEBINGEN;-50,00;538,54
09.01.2026;ALDI SUED;Kartenzahlung girocard 09.01.2026 18:22 Terminal-Nr. 60297539 ALDI SUED;-31,43;507,11
10.01.2026;Spotify AB;P2C4A81F3E Spotify Premium Student MREF: 8XHQ2LTYC CRED: SE30ZZZ70000000002;-6,99;500,12
11.01.2026;Kreissparkasse Tuebingen;Bargeldauszahlung GA 11.01.2026 19:22 Terminal-Nr. 62688421 KSK TUEBINGEN;-20,00;480,12
14.01.2026;dm-drogerie markt;Kartenzahlung girocard 14.01.2026 11:03 Terminal-Nr. 65813739 DM FIL.1764;-15,31;464,81
18.01.2026;Studierendenwerk Tuebingen-Hohenheim;Kartenzahlung girocard 18.01.2026 19:37 Terminal-Nr. 64121555 AUFLADUNG MENSAKARTE;-15,00;449,81
19.01.2026;Netflix International B.V.;Netflix.com 2420620404 MREF: NFLX-61734820 CRED: NL64ZZZ341973120000;-13,99;435,82
19.01.2026;AMAZON PAYMENTS EUROPE S.C.A.;305-9903543-4820973 Amazon.de Z8QAT02VQAZ5ZNEF MREF: Z8QAT02VQA CRED: DE94ZZZ00000561653;-44,10;391,72
24.01.2026;AMAZON PAYMENTS EUROPE S.C.A.;305-2449555-3444917 Amazon.de SR90WXSDXS9Y290P MREF: SR90WXSDXS CRED: DE94ZZZ00000561653;-17,00;374,72
26.01.2026;Studierendenwerk Tuebingen-Hohenheim;Kartenzahlung girocard 26.01.2026 10:59 Terminal-Nr. 63452502 AUFLADUNG MENSAKARTE;-20,00;354,72
26.01.2026;PayPal Europe S.a.r.l. et Cie S.C.A;9938442126455 PP.1780.PP . Vinted UAB, Ihr Einkauf bei Vinted UAB MREF: 9978627885783 CRED: LU96ZZZ0000000000000000058;-12,56;342,16
26.01.2026;AMAZON PAYMENTS EUROPE S.C.A.;305-7252191-2402528 Amazon.de NJ16CBNZBAZKT1BE MREF: NJ16CBNZBA CRED: DE94ZZZ00000561653;-32,35;309,81
29.01.2026;EDEKA;Kartenzahlung girocard 29.01.2026 16:00 Terminal-Nr. 67708704 EDEKA Center;-16,11;293,70
30.01.2026;Neckartal Logistik GmbH;LOHN/GEHALT 01/2026 PERS-NR 004821 SVWZ+Entgeltabrechnung;562,92;856,62
01.02.2026;AMAZON PAYMENTS EUROPE S.C.A.;302-5024076-4560523 Amazon.de 097N80JMZBSED17C MREF: 097N80JMZB CRED: DE94ZZZ00000561653;-39,53;817,09
02.02.2026;Mueller, Thomas;DAUERAUFTRAG Unterstuetzung 02/2026;300,00;1117,09
02.02.2026;Schneider, Katrin;DAUERAUFTRAG Miete Zimmer WG 02/2026 inkl. NK;-420,00;697,09
02.02.2026;DB Vertrieb GmbH;Deutschlandticket 02.2026 Abo-Nr. 48302917 MREF: DT-0048302917 CRED: DE25ZZZ00000007758;-63,00;634,09
02.02.2026;Kaufland;Kartenzahlung girocard 02.02.2026 15:50 Terminal-Nr. 69666567 KAUFLAND TUEBINGEN;-87,96;546,13
03.02.2026;Lidl Vertriebs GmbH & Co. KG;Kartenzahlung girocard 03.02.2026 18:12 Terminal-Nr. 63318470 LIDL DIENSTLEISTUNG;-14,37;531,76
05.02.2026;Telefonica Germany GmbH + Co. OHG;Kd-Nr. 7140382266 Rechnung 02/2026 MREF: 1EXN73KQ2WP9 CRED: DE26ZZZ00000031258;-12,99;518,77
06.02.2026;REWE Markt GmbH;Kartenzahlung girocard 06.02.2026 19:41 Terminal-Nr. 67211946 REWE SAGT DANKE;-22,85;495,92
09.02.2026;Universitaet Tuebingen;Semesterbeitrag SoSe 2026 Matr.-Nr. 6123457;-168,30;327,62
11.02.2026;Boulderhalle Tuebingen;Kartenzahlung girocard 11.02.2026 11:36 Terminal-Nr. 61013342 BOULDERHALLE;-38,51;289,11
12.02.2026;Spotify AB;P2C4A81F3E Spotify Premium Student MREF: 8XHQ2LTYC CRED: SE30ZZZ70000000002;-6,99;282,12
16.02.2026;Netflix International B.V.;Netflix.com 4491580513 MREF: NFLX-61734820 CRED: NL64ZZZ341973120000;-13,99;268,13
18.02.2026;Kreissparkasse Tuebingen;Bargeldauszahlung GA 18.02.2026 16:52 Terminal-Nr. 66282778 KSK TUEBINGEN;-30,00;238,13
19.02.2026;ALDI SUED;Kartenzahlung girocard 19.02.2026 17:26 Terminal-Nr. 60942213 ALDI SUED;-11,64;226,49
21.02.2026;Lieferando.de;Lieferando.de Bestellung 3K9QX7 Takeaway.com 21.02.2026 MREF: TKW-4419283 CRED: NL22ZZZ582639030000;-18,40;208,09
24.02.2026;EDEKA;Kartenzahlung girocard 24.02.2026 12:08 Terminal-Nr. 65871304 EDEKA Center;-17,92;190,17
27.02.2026;Neckartal Logistik GmbH;LOHN/GEHALT 02/2026 PERS-NR 004821 SVWZ+Entgeltabrechnung;604,87;795,04
01.03.2026;Kaufland;Kartenzahlung girocard 01.03.2026 10:10 Terminal-Nr. 69251723 KAUFLAND TUEBINGEN;-55,55;739,49
01.03.2026;EDEKA;Kartenzahlung girocard 01.03.2026 13:51 Terminal-Nr. 69587303 EDEKA Center;-35,82;703,67
02.03.2026;Telefonica Germany GmbH + Co. OHG;Kd-Nr. 7140382266 Rechnung 03/2026 MREF: 1EXN73KQ2WP9 CRED: DE26ZZZ00000031258;-12,99;690,68
03.03.2026;Mueller, Thomas;DAUERAUFTRAG Unterstuetzung 03/2026;300,00;990,68
03.03.2026;Schneider, Katrin;DAUERAUFTRAG Miete Zimmer WG 03/2026 inkl. NK;-420,00;570,68
03.03.2026;DB Vertrieb GmbH;Deutschlandticket 03.2026 Abo-Nr. 48302917 MREF: DT-0048302917 CRED: DE25ZZZ00000007758;-63,00;507,68
05.03.2026;ALDI SUED;Kartenzahlung girocard 05.03.2026 12:10 Terminal-Nr. 64750023 ALDI SUED;-85,73;421,95
07.03.2026;Lena Hoffmann;Pizza Freitag + Kino;-14,50;407,45
08.03.2026;EDEKA;Kartenzahlung girocard 08.03.2026 14:53 Terminal-Nr. 62987053 EDEKA Center;-24,09;383,36
09.03.2026;Spotify AB;P2C4A81F3E Spotify Premium Student MREF: 8XHQ2LTYC CRED: SE30ZZZ70000000002;-6,99;376,37
11.03.2026;AMAZON PAYMENTS EUROPE S.C.A.;302-3483811-8993857 Amazon.de T629U1K8MK66Z3S9 MREF: T629U1K8MK CRED: DE94ZZZ00000561653;-61,34;315,03
16.03.2026;Netflix International B.V.;Netflix.com 5549340858 MREF: NFLX-61734820 CRED: NL64ZZZ341973120000;-13,99;301,04
17.03.2026;Kaufland;Kartenzahlung girocard 17.03.2026 11:39 Terminal-Nr. 64196832 KAUFLAND TUEBINGEN;-95,55;205,49
20.03.2026;Bar Barrique Tuebingen;Kartenzahlung girocard 20.03.2026 22:47 Terminal-Nr. 68120453 BARRIQUE TUEBINGEN;-16,80;188,69
22.03.2026;Studierendenwerk Tuebingen-Hohenheim;Kartenzahlung girocard 22.03.2026 15:52 Terminal-Nr. 63702505 AUFLADUNG MENSAKARTE;-25,00;163,69
27.03.2026;Neckartal Logistik GmbH;LOHN/GEHALT 03/2026 PERS-NR 004821 SVWZ+Entgeltabrechnung;642,94;806,63
31.03.2026;Lidl Vertriebs GmbH & Co. KG;Kartenzahlung girocard 31.03.2026 16:19 Terminal-Nr. 67977785 LIDL DIENSTLEISTUNG;-33,41;773,22
01.04.2026;Schneider, Katrin;DAUERAUFTRAG Miete Zimmer WG 04/2026 inkl. NK;-420,00;353,22
01.04.2026;AMAZON PAYMENTS EUROPE S.C.A.;303-8042006-8168263 Amazon.de 1V0V8HE367LF3VR6 MREF: 1V0V8HE367 CRED: DE94ZZZ00000561653;-21,36;331,86
02.04.2026;Mueller, Thomas;DAUERAUFTRAG Unterstuetzung 04/2026;300,00;631,86
02.04.2026;Kaufland;Kartenzahlung girocard 02.04.2026 11:18 Terminal-Nr. 60935439 KAUFLAND TUEBINGEN;-17,58;614,28
03.04.2026;DB Vertrieb GmbH;Deutschlandticket 04.2026 Abo-Nr. 48302917 MREF: DT-0048302917 CRED: DE25ZZZ00000007758;-63,00;551,28
06.04.2026;Telefonica Germany GmbH + Co. OHG;Kd-Nr. 7140382266 Rechnung 04/2026 MREF: 1EXN73KQ2WP9 CRED: DE26ZZZ00000031258;-12,99;538,29
06.04.2026;Rossmann;Kartenzahlung girocard 06.04.2026 10:57 Terminal-Nr. 65357113 ROSSMANN 2213;-18,23;520,06
07.04.2026;PayPal Europe S.a.r.l. et Cie S.C.A;4837608854306 PP.6729.PP . ZALANDO SE, Ihr Einkauf bei ZALANDO SE MREF: 8663004325775 CRED: LU96ZZZ0000000000000000058;-46,45;473,61
08.04.2026;Kaufland;Kartenzahlung girocard 08.04.2026 16:33 Terminal-Nr. 66089299 KAUFLAND TUEBINGEN;-70,07;403,54
08.04.2026;Lidl Vertriebs GmbH & Co. KG;Kartenzahlung girocard 08.04.2026 20:45 Terminal-Nr. 69942921 LIDL DIENSTLEISTUNG;-27,53;376,01
09.04.2026;AMAZON PAYMENTS EUROPE S.C.A.;306-8857804-3113262 Amazon.de 1EEG3AZ2JHV3MEL1 MREF: 1EEG3AZ2JH CRED: DE94ZZZ00000561653;-18,51;357,50
11.04.2026;Ristorante Da Gino;Kartenzahlung girocard 11.04.2026 20:31 Terminal-Nr. 61775029 DA GINO TUEBINGEN;-21,90;335,60
13.04.2026;Spotify AB;P2C4A81F3E Spotify Premium Student MREF: 8XHQ2LTYC CRED: SE30ZZZ70000000002;-6,99;328,61
13.04.2026;AMAZON PAYMENTS EUROPE S.C.A.;302-4325346-3104806 Amazon.de 1YQCP7KFEGUCWMFT MREF: 1YQCP7KFEG CRED: DE94ZZZ00000561653;-29,27;299,34
17.04.2026;Neckar Direkt Versicherung AG;Privathaftpflicht Jahresbeitrag 2026/27 Vers.-Nr. PH-3318204 MREF: ND3318204 CRED: DE41ZZZ00000248813;-54,60;244,74
18.04.2026;Netflix International B.V.;Netflix.com 5460483362 MREF: NFLX-61734820 CRED: NL64ZZZ341973120000;-13,99;230,75
24.04.2026;Studierendenwerk Tuebingen-Hohenheim;Kartenzahlung girocard 24.04.2026 13:16 Terminal-Nr. 62543117 AUFLADUNG MENSAKARTE;-20,00;210,75
25.04.2026;Lieferando.de;Lieferando.de Bestellung 7TPM2R Takeaway.com 25.04.2026 MREF: TKW-4419283 CRED: NL22ZZZ582639030000;-15,90;194,85
26.04.2026;EDEKA;Kartenzahlung girocard 26.04.2026 15:16 Terminal-Nr. 60704357 EDEKA Center;-48,04;146,81
28.04.2026;Neckartal Logistik GmbH;LOHN/GEHALT 04/2026 PERS-NR 004821 SVWZ+Entgeltabrechnung;572,55;719,36
01.05.2026;Schneider, Katrin;DAUERAUFTRAG Miete Zimmer WG 05/2026 inkl. NK;-420,00;299,36
04.05.2026;Mueller, Thomas;DAUERAUFTRAG Unterstuetzung 05/2026;300,00;599,36
04.05.2026;DB Vertrieb GmbH;Deutschlandticket 05.2026 Abo-Nr. 48302917 MREF: DT-0048302917 CRED: DE25ZZZ00000007758;-63,00;536,36
05.05.2026;PayPal Europe S.a.r.l. et Cie S.C.A;8056101965174 PP.5877.PP . Thalia Buecher GmbH, Ihr Einkauf bei Thalia Buecher GmbH MREF: 3381374424007 CRED: LU96ZZZ0000000000000000058;-68,98;467,38
05.05.2026;Lidl Vertriebs GmbH & Co. KG;Kartenzahlung girocard 05.05.2026 10:01 Terminal-Nr. 64080381 LIDL DIENSTLEISTUNG;-53,06;414,32
06.05.2026;Telefonica Germany GmbH + Co. OHG;Kd-Nr. 7140382266 Rechnung 05/2026 MREF: 1EXN73KQ2WP9 CRED: DE26ZZZ00000031258;-12,99;401,33
06.05.2026;ALDI SUED;Kartenzahlung girocard 06.05.2026 19:02 Terminal-Nr. 65950085 ALDI SUED;-67,15;334,18
08.05.2026;EDEKA;Kartenzahlung girocard 08.05.2026 14:11 Terminal-Nr. 62275619 EDEKA Center;-28,80;305,38
10.05.2026;Spotify AB;P2C4A81F3E Spotify Premium Student MREF: 8XHQ2LTYC CRED: SE30ZZZ70000000002;-6,99;298,39
10.05.2026;AMAZON PAYMENTS EUROPE S.C.A.;304-9471014-8816160 Amazon.de E0JQUXU88NMTQDBA MREF: E0JQUXU88N CRED: DE94ZZZ00000561653;-54,30;244,09
12.05.2026;Kaufland;Kartenzahlung girocard 12.05.2026 09:43 Terminal-Nr. 64546138 KAUFLAND TUEBINGEN;-36,57;207,52
12.05.2026;Kreissparkasse Tuebingen;Bargeldauszahlung GA 12.05.2026 11:58 Terminal-Nr. 69608516 KSK TUEBINGEN;-20,00;187,52
16.05.2026;Jonas Weber;Geburtstagsgeschenk Marie Anteil;-10,00;177,52
18.05.2026;Netflix International B.V.;Netflix.com 8526192840 MREF: NFLX-61734820 CRED: NL64ZZZ341973120000;-13,99;163,53
20.05.2026;Boulderhalle Tuebingen;Kartenzahlung girocard 20.05.2026 11:37 Terminal-Nr. 66070633 BOULDERHALLE;-20,34;143,19
27.05.2026;Neckartal Logistik GmbH;LOHN/GEHALT 05/2026 PERS-NR 004821 SVWZ+Entgeltabrechnung;633,94;777,13
29.05.2026;Kuckuck Bar;Kartenzahlung girocard 29.05.2026 23:14 Terminal-Nr. 66403817 KUCKUCK TUEBINGEN;-12,60;764,53
31.05.2026;AMAZON PAYMENTS EUROPE S.C.A.;306-4313072-4573292 Amazon.de GP21P6DP7JB6QMAG MREF: GP21P6DP7J CRED: DE94ZZZ00000561653;-40,81;723,72
02.06.2026;Mueller, Thomas;DAUERAUFTRAG Unterstuetzung 06/2026;300,00;1023,72
02.06.2026;Telefonica Germany GmbH + Co. OHG;Kd-Nr. 7140382266 Rechnung 06/2026 MREF: 1EXN73KQ2WP9 CRED: DE26ZZZ00000031258;-12,99;1010,73
03.06.2026;Schneider, Katrin;DAUERAUFTRAG Miete Zimmer WG 06/2026 inkl. NK;-420,00;590,73
03.06.2026;Lidl Vertriebs GmbH & Co. KG;Kartenzahlung girocard 03.06.2026 08:29 Terminal-Nr. 62590576 LIDL DIENSTLEISTUNG;-22,52;568,21
04.06.2026;DB Vertrieb GmbH;Deutschlandticket 06.2026 Abo-Nr. 48302917 MREF: DT-0048302917 CRED: DE25ZZZ00000007758;-63,00;505,21
06.06.2026;Kaufland;Kartenzahlung girocard 06.06.2026 09:27 Terminal-Nr. 61356878 KAUFLAND TUEBINGEN;-18,56;486,65
06.06.2026;Studierendenwerk Tuebingen-Hohenheim;Kartenzahlung girocard 06.06.2026 14:31 Terminal-Nr. 67213894 AUFLADUNG MENSAKARTE;-20,00;466,65
09.06.2026;PayPal Europe S.a.r.l. et Cie S.C.A;1362372769979 PP.7516.PP . Steam Games, Ihr Einkauf bei Steam Games MREF: 3544628330443 CRED: LU96ZZZ0000000000000000058;-23,57;443,08
11.06.2026;Kreissparkasse Tuebingen;Bargeldauszahlung GA 11.06.2026 20:38 Terminal-Nr. 60167753 KSK TUEBINGEN;-50,00;393,08
13.06.2026;Spotify AB;P2C4A81F3E Spotify Premium Student MREF: 8XHQ2LTYC CRED: SE30ZZZ70000000002;-6,99;386,09
13.06.2026;dm-drogerie markt;Kartenzahlung girocard 13.06.2026 16:28 Terminal-Nr. 64603431 DM FIL.1764;-9,22;376,87
13.06.2026;Vapiano Tuebingen;Kartenzahlung girocard 13.06.2026 19:52 Terminal-Nr. 62291746 VAPIANO TUEBINGEN;-17,40;359,47
20.06.2026;Netflix International B.V.;Netflix.com 6706964252 MREF: NFLX-61734820 CRED: NL64ZZZ341973120000;-13,99;345,48
20.06.2026;Kreissparkasse Tuebingen;Bargeldauszahlung GA 20.06.2026 15:46 Terminal-Nr. 60656872 KSK TUEBINGEN;-50,00;295,48
21.06.2026;EDEKA;Kartenzahlung girocard 21.06.2026 09:18 Terminal-Nr. 67712402 EDEKA Center;-33,17;262,31
22.06.2026;PayPal Europe S.a.r.l. et Cie S.C.A;8861022450215 PP.2278.PP . Thalia Buecher GmbH, Ihr Einkauf bei Thalia Buecher GmbH MREF: 1271757208950 CRED: LU96ZZZ0000000000000000058;-38,26;224,05
25.06.2026;AMAZON PAYMENTS EUROPE S.C.A.;302-1997086-1095409 Amazon.de 02P6B99SZPYV4PVW MREF: 02P6B99SZP CRED: DE94ZZZ00000561653;-33,38;190,67
28.06.2026;Lidl Vertriebs GmbH & Co. KG;Kartenzahlung girocard 28.06.2026 10:30 Terminal-Nr. 68492756 LIDL DIENSTLEISTUNG;-52,68;137,99
30.06.2026;Neckartal Logistik GmbH;LOHN/GEHALT 06/2026 PERS-NR 004821 SVWZ+Entgeltabrechnung;589,55;727,54
30.06.2026;REWE Markt GmbH;Kartenzahlung girocard 30.06.2026 09:15 Terminal-Nr. 68836279 REWE SAGT DANKE;-21,40;706,14`;

const numberFromGerman = (value) => Number(value.trim().replace(/\./g, "").replace(",", "."));

function parseCsv(csvText) {
  const lines = csvText.trim().split(/\r?\n/);
  const expectedHeader = ["Datum", "Empfänger/Auftraggeber", "Verwendungszweck", "Betrag", "Kontostand"];
  const header = lines.shift().split(";");
  if (header.length !== expectedHeader.length || header.some((value, index) => value !== expectedHeader[index])) {
    throw new Error("Die CSV-Kopfzeile hat ein unerwartetes Format.");
  }

  return lines.map((line, index) => {
    const columns = line.split(";");
    if (columns.length !== 5) {
      throw new Error(`CSV-Zeile ${index + 2} enthält ${columns.length} statt 5 Spalten.`);
    }

    const [dateText, empfaenger, zweck, amountText, saldoText] = columns;
    const dateMatch = /^(\d{2})\.(\d{2})\.(\d{4})$/.exec(dateText);
    if (!dateMatch) throw new Error(`Ungültiges Datum in CSV-Zeile ${index + 2}: ${dateText}`);
    const [, day, month, year] = dateMatch;
    const datum = new Date(Number(year), Number(month) - 1, Number(day));
    if (datum.getFullYear() !== Number(year) || datum.getMonth() !== Number(month) - 1 || datum.getDate() !== Number(day)) {
      throw new Error(`Ungültiges Datum in CSV-Zeile ${index + 2}: ${dateText}`);
    }

    const betrag = numberFromGerman(amountText);
    const saldo = numberFromGerman(saldoText);
    if (!Number.isFinite(betrag) || !Number.isFinite(saldo)) {
      throw new Error(`Ungültiger Betrag oder Kontostand in CSV-Zeile ${index + 2}.`);
    }

    const category = CATEGORY_CONFIG.find(({ match }) => match.test(empfaenger));
    const zahlungsart = zweck.includes("Kartenzahlung") ? "Karte"
      : zweck.includes("Bargeldauszahlung") ? "Bargeld"
      : zweck.includes("DAUERAUFTRAG") ? "Dauerauftrag"
      : zweck.includes("MREF") ? "Lastschrift"
      : betrag > 0 ? "Gutschrift"
      : "Überweisung";

    return {
      id: index + 1,
      datum,
      empfaenger,
      zweck,
      betrag,
      saldo,
      kategorie: category.name,
      zahlungsart,
      wochentag: new Intl.DateTimeFormat("de-DE", { weekday: "long" }).format(datum),
      monat: new Intl.DateTimeFormat("de-DE", { month: "long", year: "numeric" }).format(datum)
    };
  });
}

const buchungen = parseCsv(RAW_CSV);
const euro = new Intl.NumberFormat("de-DE", { style: "currency", currency: "EUR" });
const formatEuro = (amount) => euro.format(amount);
const chartInstances = [];
let activeFilter = null;
const selectedCategories = new Set(CATEGORY_CONFIG.map(({ name }) => name));
const transactionFilters = { search: "", from: "", to: "", payment: "", flow: "all", amountMin: 0, amountMax: Infinity, weekday: "all" };
let transactionSort = [{ key: "datum", direction: "desc" }];
let currentTransactions = [...buchungen];
const collapsedGroups = new Set();
const saldoKonsistent = buchungen.every((buchung, index) => {
  const vorherigerSaldo = index === 0 ? START_SALDO : buchungen[index - 1].saldo;
  return Math.round(buchung.saldo * 100) === Math.round((vorherigerSaldo + buchung.betrag) * 100);
});
console.log("Anzahl Buchungen:", buchungen.length);
console.log("Endsaldo:", formatEuro(buchungen.at(-1)?.saldo ?? START_SALDO));
console.log("Saldo jeder Zeile korrekt:", saldoKonsistent);

const datumFormat = new Intl.DateTimeFormat("de-DE", { day: "2-digit", month: "short", year: "numeric" });
const $ = (selector) => document.querySelector(selector);
const categoryFor = (name) => CATEGORY_CONFIG.find(({ name: configuredName }) => configuredName === name);

const decimalFormat = new Intl.NumberFormat("de-DE", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
const percentFormat = new Intl.NumberFormat("de-DE", { minimumFractionDigits: 1, maximumFractionDigits: 1 });
const dateLongFormat = new Intl.DateTimeFormat("de-DE", { day: "2-digit", month: "2-digit", year: "numeric" });
const dateShortFormat = new Intl.DateTimeFormat("de-DE", { day: "numeric", month: "short", year: "numeric" });
const kpiAnimationTokens = new WeakMap();
const kpiAnimationTimers = new WeakMap();

// Mittelwert als arithmetischen Durchschnitt berechnen; für leere Stichproben gibt es keinen Wert.
function mean(values) {
  return values.length ? values.reduce((sum, value) => sum + value, 0) / values.length : null;
}

// Median als mittleren Wert der sortierten Stichprobe berechnen.
function median(values) {
  if (!values.length) return null;
  const sorted = [...values].sort((a, b) => a - b);
  const middle = Math.floor(sorted.length / 2);
  return sorted.length % 2 ? sorted[middle] : (sorted[middle - 1] + sorted[middle]) / 2;
}

// Stichprobenstandardabweichung mit n−1 Freiheitsgraden berechnen.
function sd(values) {
  if (values.length < 2) return null;
  const average = mean(values);
  const sumSquaredDeviations = values.reduce((sum, value) => sum + (value - average) ** 2, 0);
  return Math.sqrt(sumSquaredDeviations / (values.length - 1));
}

// Quantil mit linearer Interpolation zwischen benachbarten Ordnungsstatistiken berechnen.
function quantile(values, probability) {
  if (!values.length) return null;
  const sorted = [...values].sort((a, b) => a - b);
  const position = (sorted.length - 1) * probability;
  const lowerIndex = Math.floor(position);
  const fraction = position - lowerIndex;
  return sorted[lowerIndex] + (sorted[Math.min(lowerIndex + 1, sorted.length - 1)] - sorted[lowerIndex]) * fraction;
}

// Verzerrungskorrigierte Fisher-Pearson-Stichprobenschiefe berechnen.
function skewness(values) {
  if (values.length < 3) return null;
  const average = mean(values);
  const secondMoment = mean(values.map((value) => (value - average) ** 2));
  if (!secondMoment) return 0;
  const thirdMoment = mean(values.map((value) => (value - average) ** 3));
  const biasedSkew = thirdMoment / secondMoment ** 1.5;
  return Math.sqrt(values.length * (values.length - 1)) / (values.length - 2) * biasedSkew;
}

// Unverzerrte Stichproben-Kurtosis als Exzess gegenüber der Normalverteilung berechnen.
function kurtosis(values) {
  const count = values.length;
  if (count < 4) return null;
  const average = mean(values);
  const secondMoment = mean(values.map((value) => (value - average) ** 2));
  if (!secondMoment) return 0;
  const fourthMoment = mean(values.map((value) => (value - average) ** 4));
  const biasedExcess = fourthMoment / secondMoment ** 2 - 3;
  return ((count - 1) / ((count - 2) * (count - 3))) * ((count + 1) * biasedExcess + 6);
}

function tCritical95(degreesOfFreedom) {
  const criticalValues = [
    null, 12.706, 4.303, 3.182, 2.776, 2.571, 2.447, 2.365, 2.306, 2.262,
    2.228, 2.201, 2.179, 2.160, 2.145, 2.131, 2.120, 2.110, 2.101, 2.093,
    2.086, 2.080, 2.074, 2.069, 2.064, 2.060, 2.056, 2.052, 2.048, 2.045, 2.042
  ];
  if (degreesOfFreedom < criticalValues.length) return criticalValues[degreesOfFreedom];
  const z = 1.959963984540054;
  const df = degreesOfFreedom;
  return z + (z ** 3 + z) / (4 * df)
    + (5 * z ** 5 + 16 * z ** 3 + 3 * z) / (96 * df ** 2)
    + (3 * z ** 7 + 19 * z ** 5 + 17 * z ** 3 - 15 * z) / (384 * df ** 3);
}

function infoTip(formula, explanation, interpretation) {
  const tip = document.createElement("span");
  tip.className = "info-tip";
  tip.tabIndex = 0;
  tip.setAttribute("role", "img");
  tip.setAttribute("aria-label", `${formula} ${explanation} ${interpretation}`);
  tip.dataset.tooltip = `Formel: ${formula}\n${explanation}\nAktuell: ${interpretation}`;
  return tip;
}

function renderSparkline(id, values) {
  const svg = document.getElementById(id);
  svg.replaceChildren();
  svg.setAttribute("viewBox", "0 0 100 30");
  svg.setAttribute("preserveAspectRatio", "none");
  if (!values.length) return;
  const min = Math.min(...values);
  const max = Math.max(...values);
  const span = max - min || 1;
  const points = values.map((value, index) => {
    const x = values.length === 1 ? 50 : 2 + (index / (values.length - 1)) * 96;
    const y = 25 - ((value - min) / span) * 19;
    return `${x},${y}`;
  }).join(" ");
  const line = document.createElementNS("http://www.w3.org/2000/svg", "polyline");
  line.setAttribute("points", points);
  line.setAttribute("fill", "none");
  line.setAttribute("vector-effect", "non-scaling-stroke");
  line.classList.add("sparkline-line");
  svg.append(line);
  const [lastX, lastY] = points.split(" ").at(-1).split(",");
  const dot = document.createElementNS("http://www.w3.org/2000/svg", "circle");
  dot.setAttribute("cx", lastX);
  dot.setAttribute("cy", lastY);
  dot.setAttribute("r", "1.7");
  dot.classList.add("sparkline-dot");
  svg.append(dot);
}

function animateKpi(element, value, formatter) {
  const token = {};
  kpiAnimationTokens.set(element, token);
  window.clearTimeout(kpiAnimationTimers.get(element));
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const bounds = element.getBoundingClientRect();
  const isVisible = bounds.top < window.innerHeight && bounds.bottom > 0;
  if (reducedMotion || !Number.isFinite(value) || !isVisible) {
    element.textContent = formatter(value);
    return;
  }
  const started = performance.now();
  const duration = 650;
  element.textContent = formatter(0);
  kpiAnimationTimers.set(element, window.setTimeout(() => {
    if (kpiAnimationTokens.get(element) === token) element.textContent = formatter(value);
  }, duration + 100));
  const draw = (now) => {
    if (kpiAnimationTokens.get(element) !== token) return;
    const progress = Math.min((now - started) / duration, 1);
    const eased = 1 - (1 - progress) ** 3;
    element.textContent = formatter(value * eased);
    if (progress < 1) window.requestAnimationFrame(draw);
    else window.clearTimeout(kpiAnimationTimers.get(element));
  };
  window.requestAnimationFrame(draw);
}

function groupByMonth(items) {
  const months = new Map();
  for (const item of items) {
    const key = `${item.datum.getFullYear()}-${String(item.datum.getMonth() + 1).padStart(2, "0")}`;
    if (!months.has(key)) months.set(key, { date: new Date(item.datum.getFullYear(), item.datum.getMonth(), 1), items: [] });
    months.get(key).items.push(item);
  }
  return [...months.entries()].sort((a, b) => a[1].date - b[1].date);
}

function daysBetweenInclusive(firstDate, lastDate) {
  if (!firstDate || !lastDate) return 0;
  const first = Date.UTC(firstDate.getFullYear(), firstDate.getMonth(), firstDate.getDate());
  const last = Date.UTC(lastDate.getFullYear(), lastDate.getMonth(), lastDate.getDate());
  return Math.floor((last - first) / 86400000) + 1;
}

function renderKpis(transactions) {
  const ordered = [...transactions].sort((a, b) => a.datum - b.datum || a.id - b.id);
  const outgoing = ordered.filter(({ betrag }) => betrag < 0);
  const incoming = ordered.filter(({ betrag }) => betrag > 0);
  const income = incoming.reduce((sum, item) => sum + item.betrag, 0);
  const expense = outgoing.reduce((sum, item) => sum + Math.abs(item.betrag), 0);
  const net = income - expense;
  const fixedCosts = outgoing
    .filter(({ kategorie }) => kategorie === "Miete" || kategorie === "Abos & Verträge")
    .reduce((sum, item) => sum + Math.abs(item.betrag), 0);
  const first = ordered[0];
  const last = ordered.at(-1);
  $("#period-label").textContent = first && last ? `${dateShortFormat.format(first.datum)} – ${dateShortFormat.format(last.datum)}` : "Keine Buchungen";
  const currentBalance = last?.saldo ?? null;
  const firstOriginalIndex = first ? buchungen.findIndex(({ id }) => id === first.id) : -1;
  const startingBalance = firstOriginalIndex > 0 ? buchungen[firstOriginalIndex - 1].saldo : START_SALDO;
  const balanceChange = currentBalance === null || startingBalance === 0 ? null : (currentBalance - startingBalance) / startingBalance * 100;
  const periodDays = daysBetweenInclusive(first?.datum, last?.datum);
  const dailyExpense = periodDays ? expense / periodDays : 0;
  const savingsRate = income ? net / income : null;
  const fixedRate = income ? fixedCosts / income : null;
  const runway = dailyExpense > 0 && currentBalance > 0 ? currentBalance / dailyExpense : null;
  const largestExpense = outgoing.reduce((largest, item) => !largest || Math.abs(item.betrag) > Math.abs(largest.betrag) ? item : largest, null);
  const monthlyData = groupByMonth(ordered).map(([key, group]) => {
    const monthIncome = group.items.filter(({ betrag }) => betrag > 0).reduce((sum, item) => sum + item.betrag, 0);
    const monthExpenses = group.items.filter(({ betrag }) => betrag < 0).reduce((sum, item) => sum + Math.abs(item.betrag), 0);
    const monthFixed = group.items.filter(({ betrag, kategorie }) => betrag < 0 && (kategorie === "Miete" || kategorie === "Abos & Verträge")).reduce((sum, item) => sum + Math.abs(item.betrag), 0);
    const monthDays = daysBetweenInclusive(
      first && first.datum > group.date ? first.datum : group.date,
      last && last.datum < new Date(group.date.getFullYear(), group.date.getMonth() + 1, 0) ? last.datum : new Date(group.date.getFullYear(), group.date.getMonth() + 1, 0)
    );
    const endingBalance = group.items.at(-1).saldo;
    return {
      key,
      balance: endingBalance,
      income: monthIncome,
      expenses: monthExpenses,
      net: monthIncome - monthExpenses,
      savingsRate: monthIncome ? (monthIncome - monthExpenses) / monthIncome : 0,
      fixedRate: monthIncome ? monthFixed / monthIncome : 0,
      dailyExpense: monthDays ? monthExpenses / monthDays : 0,
      runway: monthDays && monthExpenses ? endingBalance / (monthExpenses / monthDays) : 0,
      largestExpense: Math.max(0, ...group.items.filter(({ betrag }) => betrag < 0).map(({ betrag }) => Math.abs(betrag)))
    };
  });
  const sparklineValues = (key) => monthlyData.map((month) => month[key]);
  const kpis = [
    { id: "balance", value: currentBalance, format: formatEuro, formula: "Letzter Kontostand im Filter", explain: "Der aktuelle Saldo zeigt den Kontostand nach der letzten Buchung.", interpret: currentBalance === null ? "Für den Filter liegen keine Buchungen vor." : `Der Kontostand ist ${currentBalance >= 0 ? "positiv" : "negativ"} und beträgt ${formatEuro(currentBalance)}.`, trend: "balance" },
    { id: "income", value: income, format: formatEuro, formula: "Σ positive Buchungsbeträge", explain: "Die Summe umfasst alle Gutschriften im ausgewählten Zeitraum.", interpret: `Es wurden ${formatEuro(income)} eingenommen.`, trend: "income" },
    { id: "expenses", value: expense, format: formatEuro, formula: "Σ |negative Buchungsbeträge|", explain: "Ausgaben werden als positive Beträge summiert.", interpret: `Es wurden ${formatEuro(expense)} ausgegeben.`, trend: "expenses" },
    { id: "net", value: net, format: formatEuro, formula: "Einnahmen − Ausgaben", explain: "Der Netto-Cashflow zeigt den Überschuss oder Fehlbetrag.", interpret: net >= 0 ? "Der Cashflow ist positiv." : "Der Cashflow ist negativ.", trend: "net" },
    { id: "savings-rate", value: savingsRate, format: (value) => Number.isFinite(value) ? `${percentFormat.format(value * 100)} %` : "–", formula: "(Einnahmen − Ausgaben) / Einnahmen", explain: "Die Quote zeigt, welcher Einkommensanteil nach Ausgaben verbleibt.", interpret: savingsRate === null ? "Ohne Einnahmen nicht definiert." : `${percentFormat.format(savingsRate * 100)} % des Einkommens bleiben übrig.`, trend: "savingsRate" },
    { id: "fixed-rate", value: fixedRate, format: (value) => Number.isFinite(value) ? `${percentFormat.format(value * 100)} %` : "–", formula: "(Miete + Abos & Verträge) / Einnahmen", explain: "Die Fixkostenquote setzt Miete und Abos ins Verhältnis zu allen Einnahmen.", interpret: fixedRate === null ? "Ohne Einnahmen nicht definiert." : `${percentFormat.format(fixedRate * 100)} % der Einnahmen entfallen auf diese Fixkosten.`, trend: "fixedRate" },
    { id: "daily-expenses", value: periodDays ? dailyExpense : null, format: (value) => Number.isFinite(value) ? `${formatEuro(value)} / Tag` : "–", formula: "Gesamtausgaben / Kalendertage", explain: "Der Tagesdurchschnitt bezieht alle Kalendertage zwischen erster und letzter Buchung ein.", interpret: periodDays ? `Im Mittel werden täglich ${formatEuro(dailyExpense)} ausgegeben.` : "Für den Filter liegen keine Buchungen vor.", trend: "dailyExpense" },
    { id: "runway", value: runway, format: (value) => Number.isFinite(value) ? `${decimalFormat.format(value)} Tage` : "–", formula: "Aktueller Saldo / Ø Tagesausgaben", explain: "Die Reichweite schätzt die Tage bis zum Aufbrauchen des Saldos bei gleichbleibenden Ausgaben.", interpret: runway === null ? "Nur bei positivem Saldo und vorhandenen Ausgaben sinnvoll berechenbar." : `${decimalFormat.format(runway)} Tage rechnerische Reichweite.`, trend: "runway" },
    { id: "largest-expense", value: largestExpense ? Math.abs(largestExpense.betrag) : null, format: (value) => Number.isFinite(value) ? formatEuro(value) : "–", formula: "max(|Ausgabenbetrag|)", explain: "Gesucht wird die betragsmäßig größte einzelne Ausgabe.", interpret: largestExpense ? `${formatEuro(Math.abs(largestExpense.betrag))} bei ${largestExpense.empfaenger}.` : "Keine Ausgaben im Filter.", note: largestExpense ? `Empfänger: ${largestExpense.empfaenger}` : "Keine Ausgabe im Filter.", trend: "largestExpense" }
  ];

  for (const metric of kpis) {
    const element = $(`#kpi-${metric.id}`);
    const colorBySign = ["balance", "net", "savings-rate", "runway"].includes(metric.id);
    element.classList.toggle("positive-value", metric.id === "income" || (colorBySign && metric.value !== null && metric.value >= 0));
    element.classList.toggle("negative-value", colorBySign && metric.value < 0);
    if (metric.id === "largest-expense") {
      element.classList.remove("positive-value");
      $(`#kpi-${metric.id}-note`).textContent = metric.note;
    }
    if (metric.value === null) element.textContent = "–";
    else animateKpi(element, metric.value, metric.format);
    const heading = element.closest(".kpi-card").querySelector(".kpi-heading");
    const existingTip = heading.querySelector(".info-tip");
    existingTip.dataset.tooltip = `Formel: ${metric.formula}\n${metric.explain}\nAktuell: ${metric.interpret}`;
    existingTip.setAttribute("aria-label", `${metric.formula} ${metric.explain} ${metric.interpret}`);
    if (metric.id === "balance") {
      $(`#kpi-${metric.id}-note`).textContent = last ? `Stand vom ${dateLongFormat.format(last.datum)}` : "Keine Buchungen im Filter";
      $("#kpi-balance-arrow").textContent = balanceChange !== null && balanceChange >= 0 ? "↑" : "↓";
      $("#kpi-balance-percent").textContent = balanceChange === null ? "–" : `${balanceChange > 0 ? "+" : ""}${percentFormat.format(balanceChange)} %`;
      $("#kpi-balance-change").classList.toggle("positive-change", balanceChange !== null && balanceChange >= 0);
    }
    renderSparkline(`sparkline-${metric.id}`, sparklineValues(metric.trend));
  }
  $("#transaction-count-label").textContent = String(ordered.length);
  $("#statistics-sample-count").textContent = `n = ${outgoing.length}`;
}

function mode(values) {
  if (!values.length) return [];
  const counts = new Map();
  for (const value of values) {
    const rounded = Math.round(value * 100) / 100;
    counts.set(rounded, (counts.get(rounded) ?? 0) + 1);
  }
  const highestCount = Math.max(...counts.values());
  return highestCount < 2 ? [] : [...counts.entries()].filter(([, count]) => count === highestCount).map(([value]) => value).sort((a, b) => a - b);
}

function maxDrawdown(transactions) {
  let peak = transactions[0] && transactions[0].id === buchungen[0]?.id ? START_SALDO : transactions[0]?.saldo ?? START_SALDO;
  let maximum = 0;
  for (const transaction of transactions) {
    peak = Math.max(peak, transaction.saldo);
    maximum = Math.max(maximum, peak - transaction.saldo);
  }
  return maximum;
}

function renderStatistics(transactions) {
  const ordered = [...transactions].sort((a, b) => a.datum - b.datum || a.id - b.id);
  const expensesOnly = ordered.filter(({ betrag }) => betrag < 0).map(({ betrag }) => Math.abs(betrag));
  const count = expensesOnly.length;
  const total = expensesOnly.reduce((sum, value) => sum + value, 0);
  const average = mean(expensesOnly);
  const middle = median(expensesOnly);
  const standardDeviation = sd(expensesOnly);
  const variance = standardDeviation === null ? null : standardDeviation ** 2;
  const coefficientVariation = average && standardDeviation !== null ? standardDeviation / average * 100 : null;
  const firstQuartile = quantile(expensesOnly, 0.25);
  const thirdQuartile = quantile(expensesOnly, 0.75);
  const interquartileRange = firstQuartile === null ? null : thirdQuartile - firstQuartile;
  const skew = skewness(expensesOnly);
  const excessKurtosis = kurtosis(expensesOnly);
  const modes = mode(expensesOnly);
  const minExpense = count ? Math.min(...expensesOnly) : null;
  const maxExpense = count ? Math.max(...expensesOnly) : null;
  const minBalance = ordered.reduce((min, item) => !min || item.saldo < min.saldo ? item : min, null);
  const maxBalance = ordered.reduce((max, item) => !max || item.saldo > max.saldo ? item : max, null);
  const drawdown = maxDrawdown(ordered);
  const ciMargin = count > 1 ? tCritical95(count - 1) * standardDeviation / Math.sqrt(count) : null;
  const interval = ciMargin === null ? null : [average - ciMargin, average + ciMargin];
  const rows = [
    { section: "Ausgabenbeträge" },
    { name: "n", value: String(count), formula: "Anzahl der Ausgaben", explanation: "Die Stichprobengröße entspricht der Zahl negativer Buchungen im Filter.", interpretation: `${count} Ausgaben wurden berücksichtigt.` },
    { name: "Summe", value: formatEuro(total), formula: "Σ xᵢ", explanation: "Gesamter Geldabfluss; jeder Ausgabenbetrag wird positiv ausgewiesen.", interpretation: `Die Ausgaben summieren sich auf ${formatEuro(total)}.` },
    { name: "Mittelwert", value: average === null ? "–" : formatEuro(average), formula: "x̄ = Σ xᵢ / n", explanation: "Arithmetischer Durchschnittsbetrag einer Ausgabe.", interpretation: average === null ? "Für leere Stichproben nicht definiert." : `Der durchschnittliche Ausgabenbetrag beträgt ${formatEuro(average)}.` },
    { name: "Median", value: middle === null ? "–" : formatEuro(middle), formula: "50-%-Quantil", explanation: "Die Hälfte der Ausgaben liegt darunter und die andere Hälfte darüber.", interpretation: middle === null ? "Für leere Stichproben nicht definiert." : `Die mittlere Ausgabe beträgt ${formatEuro(middle)}.` },
    { name: "Modus", value: modes.length ? modes.map(formatEuro).join(", ") : "Kein eindeutiger Modus", formula: "Am häufigsten auftretender Betrag", explanation: "Bei gleich häufigen häufigsten Werten werden alle Modi angezeigt.", interpretation: modes.length ? `Häufigster Betrag: ${modes.map(formatEuro).join(", ")}.` : "Kein Betrag tritt mehrfach als eindeutiger Modus auf." },
    { name: "Minimum", value: minExpense === null ? "–" : formatEuro(minExpense), formula: "min(xᵢ)", explanation: "Kleinster positiver Ausgabenbetrag.", interpretation: minExpense === null ? "Keine Ausgaben vorhanden." : `Die kleinste Ausgabe beträgt ${formatEuro(minExpense)}.` },
    { name: "Maximum", value: maxExpense === null ? "–" : formatEuro(maxExpense), formula: "max(xᵢ)", explanation: "Größter positiver Ausgabenbetrag.", interpretation: maxExpense === null ? "Keine Ausgaben vorhanden." : `Die größte Ausgabe beträgt ${formatEuro(maxExpense)}.` },
    { name: "Spannweite", value: minExpense === null ? "–" : formatEuro(maxExpense - minExpense), formula: "Maximum − Minimum", explanation: "Abstand zwischen größter und kleinster Ausgabe.", interpretation: minExpense === null ? "Keine Ausgaben vorhanden." : `Die Ausgabenwerte streuen über ${formatEuro(maxExpense - minExpense)}.` },
    { name: "Standardabweichung (Stichprobe)", value: standardDeviation === null ? "–" : formatEuro(standardDeviation), formula: "s = √(Σ(xᵢ − x̄)² / (n − 1))", explanation: "Stichprobenstandardabweichung mit n−1 Freiheitsgraden.", interpretation: standardDeviation === null ? "Mindestens zwei Werte erforderlich." : `Die Ausgaben weichen typischerweise um ${formatEuro(standardDeviation)} vom Mittelwert ab.` },
    { name: "Varianz (Stichprobe)", value: variance === null ? "–" : `${decimalFormat.format(variance)} €²`, formula: "s²", explanation: "Quadrat der Stichprobenstandardabweichung.", interpretation: variance === null ? "Mindestens zwei Werte erforderlich." : `Die quadrierte Streuung beträgt ${decimalFormat.format(variance)} €².` },
    { name: "Variationskoeffizient", value: coefficientVariation === null ? "–" : `${percentFormat.format(coefficientVariation)} %`, formula: "s / x̄ × 100 %", explanation: "Relative Streuung im Verhältnis zum Mittelwert.", interpretation: coefficientVariation === null ? "Bei zu wenigen Werten oder Mittelwert null nicht definiert." : `Die Standardabweichung entspricht ${percentFormat.format(coefficientVariation)} % des Mittelwerts.` },
    { name: "Quartil Q1", value: firstQuartile === null ? "–" : formatEuro(firstQuartile), formula: "25-%-Quantil", explanation: "Ein Viertel der Ausgaben liegt bei oder unter diesem Wert.", interpretation: firstQuartile === null ? "Keine Ausgaben vorhanden." : `25 % der Ausgaben liegen bei höchstens ${formatEuro(firstQuartile)}.` },
    { name: "Quartil Q3", value: thirdQuartile === null ? "–" : formatEuro(thirdQuartile), formula: "75-%-Quantil", explanation: "Drei Viertel der Ausgaben liegen bei oder unter diesem Wert.", interpretation: thirdQuartile === null ? "Keine Ausgaben vorhanden." : `75 % der Ausgaben liegen bei höchstens ${formatEuro(thirdQuartile)}.` },
    { name: "Interquartilsabstand", value: interquartileRange === null ? "–" : formatEuro(interquartileRange), formula: "Q3 − Q1", explanation: "Spannweite der mittleren 50 % der Ausgaben.", interpretation: interquartileRange === null ? "Keine Ausgaben vorhanden." : `Die mittleren 50 % der Ausgaben umfassen eine Spanne von ${formatEuro(interquartileRange)}.` },
    { name: "Schiefe", value: skew === null ? "–" : decimalFormat.format(skew), formula: "Korrigierte Fisher-Pearson-Schiefe", explanation: "Misst die Asymmetrie der Ausgabenverteilung.", interpretation: skew === null ? "Mindestens drei Werte erforderlich." : skew > 0.5 ? `Mit ${decimalFormat.format(skew)} ist die Verteilung rechtsschief; wenige hohe Ausgaben ziehen den Schwanz nach rechts.` : skew < -0.5 ? `Mit ${decimalFormat.format(skew)} ist die Verteilung linksschief.` : `Mit ${decimalFormat.format(skew)} ist die Verteilung näherungsweise symmetrisch.` },
    { name: "Kurtosis (Exzess)", value: excessKurtosis === null ? "–" : decimalFormat.format(excessKurtosis), formula: "Unverzerrter Stichprobenexzess", explanation: "Misst die Gipfligkeit und die Ausprägung schwerer Verteilungsschwänze relativ zur Normalverteilung.", interpretation: excessKurtosis === null ? "Mindestens vier Werte erforderlich." : excessKurtosis > 0 ? `Der Exzess ${decimalFormat.format(excessKurtosis)} zeigt schwerere Verteilungsschwänze als bei einer Normalverteilung.` : excessKurtosis < 0 ? `Der Exzess ${decimalFormat.format(excessKurtosis)} zeigt leichtere Verteilungsschwänze als bei einer Normalverteilung.` : "Exzess nahe null entspricht dem Normalverteilungs-Referenzwert." },
    { name: "95-%-Konfidenzintervall des Mittelwerts", value: interval ? `${formatEuro(interval[0])} bis ${formatEuro(interval[1])}` : "–", formula: "x̄ ± t₀,₉₇₅;ₙ₋₁ · s / √n", explanation: "t-Intervall für den Populationsmittelwert auf Basis der Stichprobe.", interpretation: interval ? `Der geschätzte Mittelwert liegt zwischen ${formatEuro(interval[0])} und ${formatEuro(interval[1])}.` : "Mindestens zwei Ausgaben erforderlich." },
    { section: "Kontostand" },
    { name: "Minimaler Kontostand", value: minBalance ? `${formatEuro(minBalance.saldo)} · ${dateLongFormat.format(minBalance.datum)}` : "–", formula: "min(Saldoᵢ)", explanation: "Niedrigster beobachteter Kontostand mit Buchungsdatum.", interpretation: minBalance ? `Tiefster Stand am ${dateLongFormat.format(minBalance.datum)}.` : "Keine Buchungen vorhanden." },
    { name: "Maximaler Kontostand", value: maxBalance ? `${formatEuro(maxBalance.saldo)} · ${dateLongFormat.format(maxBalance.datum)}` : "–", formula: "max(Saldoᵢ)", explanation: "Höchster beobachteter Kontostand mit Buchungsdatum.", interpretation: maxBalance ? `Höchster Stand am ${dateLongFormat.format(maxBalance.datum)}.` : "Keine Buchungen vorhanden." },
    { name: "Maximaler Drawdown", value: ordered.length ? formatEuro(drawdown) : "–", formula: "max(vorheriger Höchststand − folgender Kontostand)", explanation: "Größter absoluter Rückgang von einem zwischenzeitlichen Kontostandshoch zum späteren Tief.", interpretation: ordered.length ? `Der größte Rückgang beträgt ${formatEuro(drawdown)}.` : "Keine Buchungen vorhanden." }
  ];
  const body = $("#statistics-rows");
  const fragment = document.createDocumentFragment();
  for (const item of rows) {
    const row = document.createElement("tr");
    if (item.section) {
      row.className = "statistics-section-row";
      const heading = document.createElement("th");
      heading.colSpan = 2;
      heading.scope = "rowgroup";
      heading.textContent = item.section;
      row.append(heading);
    } else {
      const label = document.createElement("th");
      label.scope = "row";
      label.textContent = item.name;
      label.append(infoTip(item.formula, item.explanation, item.interpretation));
      const value = document.createElement("td");
      value.className = "numeric";
      value.textContent = item.value;
      row.append(label, value);
    }
    fragment.append(row);
  }
  body.replaceChildren(fragment);
}

// Globale Filter aktualisieren alle datenabhängigen Ansichten über diesen Einstiegspunkt.
function renderDashboard(transactions = buchungen) {
  currentTransactions = transactions;
  renderKpis(transactions);
  renderStatistics(transactions);
  renderTransactions(transactions);
  updateFilterChip();
  renderCharts(transactions);
  renderFinanceScore(transactions);
  renderInsights(transactions);
  renderMonthComparison(transactions);
  renderDataQuality();
  renderSimulator(transactions);
  renderSavingsGoal(transactions);
}

const chartTextColor = () => getComputedStyle(document.documentElement).getPropertyValue("--chart-tick").trim();
const chartGridColor = () => getComputedStyle(document.documentElement).getPropertyValue("--chart-grid").trim();
const chartPalette = ["#5c95f5", "#4dd8d0", "#82a9ef", "#65c8df", "#6d9de8", "#91b5e7", "#7890b2", "#6abbd3", "#5cb9bc"];
const isoDate = (date) => `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;

function registerAnalysisPlugins() {
  if (window.zoomPlugin) Chart.register(window.zoomPlugin);
  else if (window.ChartZoom?.default) Chart.register(window.ChartZoom.default);

  if (!Chart.registry.plugins.get("financeGuides")) {
    Chart.register({
      id: "financeGuides",
      afterDatasetsDraw(chart, _args, options) {
        const ctx = chart.ctx;
        const chartArea = chart.chartArea;
        if (!chartArea) return;
        ctx.save();
        if (chart.canvas.id === "balance-chart" && Number.isFinite(options.startBalance)) {
          const y = chart.scales.y.getPixelForValue(options.startBalance);
          ctx.setLineDash([5, 5]);
          ctx.strokeStyle = chartTextColor();
          ctx.globalAlpha = 0.65;
          ctx.beginPath();
          ctx.moveTo(chartArea.left, y);
          ctx.lineTo(chartArea.right, y);
          ctx.stroke();
          ctx.setLineDash([]);
          ctx.fillStyle = chartTextColor();
          ctx.font = "10px Inter, sans-serif";
          ctx.fillText("Startsaldo", chartArea.left + 5, y - 5);
        }
        if (chart.canvas.id === "histogram-chart") {
          for (const marker of options.markers ?? []) {
            const x = chart.scales.x.getPixelForValue(marker.index);
            ctx.setLineDash([4, 4]);
            ctx.strokeStyle = marker.color;
            ctx.lineWidth = 1.5;
            ctx.beginPath();
            ctx.moveTo(x, chartArea.top);
            ctx.lineTo(x, chartArea.bottom);
            ctx.stroke();
            ctx.setLineDash([]);
          }
        }
        ctx.restore();
      },
      afterDraw(chart, _args, options) {
        if (chart.canvas.id !== "category-chart") return;
        const { ctx, chartArea } = chart;
        if (!chartArea) return;
        ctx.save();
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillStyle = chartTextColor();
        ctx.font = "500 11px Inter, sans-serif";
        ctx.fillText("Ausgaben gesamt", (chartArea.left + chartArea.right) / 2, (chartArea.top + chartArea.bottom) / 2 - 11);
        ctx.fillStyle = getComputedStyle(document.documentElement).getPropertyValue("--text").trim();
        ctx.font = "700 15px Inter, sans-serif";
        ctx.fillText(options.totalLabel ?? formatEuro(0), (chartArea.left + chartArea.right) / 2, (chartArea.top + chartArea.bottom) / 2 + 11);
        ctx.restore();
      }
    });
  }
}

function chartOptions({ legend = false, tooltipLabel, scales = true, animation = true } = {}) {
  return {
    responsive: true,
    maintainAspectRatio: false,
    animation: animation ? { duration: 850, easing: "easeOutQuart" } : false,
    color: chartTextColor(),
    plugins: {
      legend: { display: legend, position: "bottom", labels: { color: chartTextColor(), usePointStyle: true, padding: 14 } },
      tooltip: {
        callbacks: {
          label: tooltipLabel ?? ((context) => `${context.dataset.label}: ${formatEuro(context.parsed.y ?? context.parsed)}`)
        }
      }
    },
    scales: scales ? {
      x: { grid: { display: false }, ticks: { color: chartTextColor(), maxRotation: 0, autoSkip: true } },
      y: { grid: { color: chartGridColor() }, ticks: { color: chartTextColor(), callback: (value) => formatEuro(value) } }
    } : undefined
  };
}

function addChart(id, config) {
  const chart = new Chart($(`#${id}`), config);
  chartInstances.push(chart);
  return chart;
}

function wireChartSelection(chart, selectValue) {
  chart.canvas.addEventListener("click", (event) => {
    const points = chart.getElementsAtEventForMode(event, "nearest", { intersect: true }, true);
    if (points.length) selectValue(points[0].index);
  });
}

function renderCharts(transactions = buchungen) {
  for (const chart of chartInstances) chart.destroy();
  chartInstances.length = 0;
  if (typeof Chart === "undefined") {
    $("#chart-message").textContent = "Die Diagramme konnten nicht geladen werden. Bitte prüfe die Internetverbindung.";
    return;
  }
  $("#chart-message").textContent = "";
  registerAnalysisPlugins();
  const ordered = [...transactions].sort((a, b) => a.datum - b.datum || a.id - b.id);
  const chartExpenses = ordered.filter(({ betrag }) => betrag < 0);
  const monthEntries = groupByMonth(ordered);
  const monthLabels = monthEntries.map(([, group]) => new Intl.DateTimeFormat("de-DE", { month: "short", year: "numeric" }).format(group.date));
  const monthlyIncome = monthEntries.map(([, group]) => group.items.filter(({ betrag }) => betrag > 0).reduce((sum, item) => sum + item.betrag, 0));
  const monthlyExpenses = monthEntries.map(([, group]) => group.items.filter(({ betrag }) => betrag < 0).reduce((sum, item) => sum + Math.abs(item.betrag), 0));
  const monthlyNet = monthlyIncome.map((income, index) => income - monthlyExpenses[index]);
  const expenseTotal = chartExpenses.reduce((sum, item) => sum + Math.abs(item.betrag), 0);
  const balanceValues = ordered.map(({ saldo }) => saldo);
  const minimumBalance = balanceValues.length ? Math.min(...balanceValues) : 0;
  const maximumBalance = balanceValues.length ? Math.max(...balanceValues) : 0;
  const balanceContext = $("#balance-chart").getContext("2d");
  const balanceGradient = balanceContext.createLinearGradient(0, 0, 0, $("#balance-chart").height || 240);
  balanceGradient.addColorStop(0, "rgba(92, 149, 245, 0.32)");
  balanceGradient.addColorStop(1, "rgba(92, 149, 245, 0.015)");
  const balanceOptions = chartOptions({
    tooltipLabel: (context) => `Kontostand: ${formatEuro(context.parsed.y)}`,
  });
  balanceOptions.plugins.financeGuides = { startBalance: START_SALDO };
  balanceOptions.plugins.zoom = {
    pan: { enabled: true, mode: "x" },
    zoom: { wheel: { enabled: true }, pinch: { enabled: true }, drag: { enabled: true, modifierKey: "shift", backgroundColor: "rgba(92, 149, 245, 0.12)", borderColor: "#5c95f5", borderWidth: 1 }, mode: "x" }
  };
  balanceOptions.scales.x.ticks.maxTicksLimit = 12;
  balanceOptions.scales.y.suggestedMin = Math.min(minimumBalance, START_SALDO) * 0.9;
  balanceOptions.scales.y.suggestedMax = Math.max(maximumBalance, START_SALDO) * 1.1;
  addChart("balance-chart", {
    type: "line",
    data: {
      labels: ordered.map(({ datum }) => datumFormat.format(datum)),
      datasets: [{
        label: "Kontostand",
        data: balanceValues,
        borderColor: "#5c95f5",
        backgroundColor: balanceGradient,
        fill: true,
        tension: 0.25,
        pointRadius: (context) => context.raw === minimumBalance || context.raw === maximumBalance ? 4 : 0,
        pointHoverRadius: 4,
        pointBackgroundColor: (context) => context.raw === minimumBalance ? "#4dd8d0" : context.raw === maximumBalance ? "#9dc9ff" : "#5c95f5"
      }]
    },
    options: balanceOptions
  });

  const monthlyOptions = chartOptions({ legend: true });
  monthlyOptions.plugins.legend.labels.color = chartTextColor();
  monthlyOptions.scales.y.ticks.callback = (value) => formatEuro(value);
  const monthlyChart = addChart("monthly-chart", {
    type: "bar",
    data: {
      labels: monthLabels,
      datasets: [
        { type: "bar", label: "Einnahmen", data: monthlyIncome, backgroundColor: "rgba(77, 216, 208, 0.78)", borderRadius: 5, order: 2 },
        { type: "bar", label: "Ausgaben", data: monthlyExpenses, backgroundColor: "rgba(92, 149, 245, 0.78)", borderRadius: 5, order: 2 },
        { type: "line", label: "Netto", data: monthlyNet, borderColor: "#9dc9ff", pointBackgroundColor: "#9dc9ff", pointRadius: 3, borderWidth: 2, tension: 0.25, order: 1 }
      ]
    },
    options: monthlyOptions
  });
  wireChartSelection(monthlyChart, (index) => setCrossFilter({
    type: "month",
    value: monthEntries[index][0],
    label: `Monat: ${monthLabels[index]}`
  }));

  const categoryTotals = new Map();
  for (const item of chartExpenses) categoryTotals.set(item.kategorie, (categoryTotals.get(item.kategorie) ?? 0) + Math.abs(item.betrag));
  const categoryItems = [...categoryTotals.entries()].sort((a, b) => b[1] - a[1]);
  const categoryOptions = chartOptions({
    scales: false,
    tooltipLabel: (context) => `${context.label}: ${formatEuro(context.parsed)}`
  });
  categoryOptions.cutout = "70%";
  categoryOptions.plugins.legend = { position: "bottom", labels: { usePointStyle: true, padding: 12, color: chartTextColor(), boxWidth: 8, font: { size: 10 } } };
  categoryOptions.plugins.financeGuides = { totalLabel: formatEuro(expenseTotal) };
  const categoryChart = addChart("category-chart", {
    type: "doughnut",
    data: {
      labels: categoryItems.map(([name]) => name),
      datasets: [{ data: categoryItems.map(([, total]) => total), backgroundColor: categoryItems.map(([name]) => categoryFor(name).color), borderColor: getComputedStyle(document.documentElement).getPropertyValue("--page").trim(), borderWidth: 3, hoverOffset: 5 }]
    },
    options: categoryOptions
  });
  wireChartSelection(categoryChart, (index) => {
    const name = categoryItems[index][0];
    setCrossFilter({ type: "category", value: name, label: `Kategorie: ${name}` });
  });

  renderWaterfall(ordered, monthEntries[0]?.[0]);
  renderHistogram(chartExpenses);
  renderHeatmap(ordered);
  renderWeekdayChart(chartExpenses, ordered);
  renderForecast(ordered);
}

function updateFilterChip() {
  const chip = $("#active-filter-chip");
  if (!chip) return;
  chip.hidden = !activeFilter;
  if (activeFilter) $("#active-filter-label").textContent = activeFilter.label;
}

function clamp(value, minimum, maximum) {
  return Math.min(maximum, Math.max(minimum, value));
}

function monthCategoryTotals(transactions) {
  const grouped = groupByMonth(transactions);
  return grouped.map(([key, group]) => {
    const categories = new Map();
    for (const item of group.items) {
      if (item.betrag < 0) categories.set(item.kategorie, (categories.get(item.kategorie) ?? 0) + Math.abs(item.betrag));
    }
    return { key, date: group.date, categories, total: [...categories.values()].reduce((sum, amount) => sum + amount, 0) };
  });
}

function renderFinanceScore(transactions) {
  const ordered = [...transactions].sort((a, b) => a.datum - b.datum || a.id - b.id);
  const income = ordered.filter(({ betrag }) => betrag > 0).reduce((sum, item) => sum + item.betrag, 0);
  const expenses = ordered.filter(({ betrag }) => betrag < 0).reduce((sum, item) => sum + Math.abs(item.betrag), 0);
  const fixed = ordered.filter(({ betrag, kategorie }) => betrag < 0 && (kategorie === "Miete" || kategorie === "Abos & Verträge")).reduce((sum, item) => sum + Math.abs(item.betrag), 0);
  const savingsRate = income > 0 ? (income - expenses) / income : 0;
  const fixedRate = income > 0 ? fixed / income : 1;
  const monthlyBalances = groupByMonth(ordered).map(([, group]) => group.items.at(-1).saldo);
  const averageBalance = Math.abs(mean(monthlyBalances) ?? 0);
  const balanceVariation = monthlyBalances.length > 1 && averageBalance > 0 ? (sd(monthlyBalances) ?? 0) / averageBalance : 1;
  const savingsPoints = clamp(savingsRate / 0.2, 0, 1) * 40;
  const fixedPoints = clamp(1 - fixedRate / 0.6, 0, 1) * 30;
  const stabilityPoints = clamp(1 - balanceVariation, 0, 1) * 30;
  const score = Math.round(savingsPoints + fixedPoints + stabilityPoints);
  const scoreElement = $("#finance-score");
  const arc = $("#score-gauge-arc");
  const needle = $("#score-gauge-needle");
  const start = performance.now();
  const from = Number(scoreElement.textContent) || 0;
  const targetOffset = 258 * (1 - score / 100);
  arc.style.strokeDasharray = "258";
  arc.style.strokeDashoffset = "258";
  const animate = (now) => {
    const progress = Math.min((now - start) / 800, 1);
    const eased = 1 - (1 - progress) ** 3;
    scoreElement.textContent = String(Math.round(from + (score - from) * eased));
    arc.style.strokeDashoffset = String(258 - (258 - targetOffset) * eased);
    needle.style.transform = `rotate(${-90 + score * 1.8 * eased}deg)`;
    if (progress < 1) requestAnimationFrame(animate);
  };
  requestAnimationFrame(animate);
  const caption = score >= 75 ? "Starke finanzielle Basis" : score >= 50 ? "Solide Basis mit Potenzial" : "Hier ist noch Luft nach oben";
  $("#score-caption").textContent = caption;
  $(".score-info").dataset.tooltip = `Berechnung (0–100 Punkte): Sparquote max. 40 P. = clamp(Sparquote / 20 %, 0, 1) × 40. Fixkostenquote max. 30 P. = clamp(1 − Fixkostenquote / 60 %, 0, 1) × 30. Saldo-Stabilität max. 30 P. = clamp(1 − Variationskoeffizient der monatlichen Endsalden, 0, 1) × 30. Aktuell: ${Math.round(savingsPoints)} + ${Math.round(fixedPoints)} + ${Math.round(stabilityPoints)} = ${score} Punkte.`;
  $(".score-info").setAttribute("aria-label", $(".score-info").dataset.tooltip);
}

function renderInsights(transactions) {
  const ordered = [...transactions].sort((a, b) => a.datum - b.datum || a.id - b.id);
  const months = monthCategoryTotals(ordered);
  const sentences = [];
  if (months.length) {
    if (months.length > 1) {
      const current = months.at(-1);
      const baseline = mean(months.slice(0, -1).map(({ categories }) => categories.get("Freizeit & Essen") ?? 0)) ?? 0;
      const currentSpend = current.categories.get("Freizeit & Essen") ?? 0;
      const currentMonth = new Intl.DateTimeFormat("de-DE", { month: "long" }).format(current.date);
      if (baseline > 0) {
        const change = (currentSpend - baseline) / baseline * 100;
        sentences.push(`${currentMonth} lagen deine Freizeitausgaben ${percentFormat.format(Math.abs(change))} % ${change >= 0 ? "über" : "unter"} dem Monatsdurchschnitt davor.`);
      } else {
        sentences.push(`${currentMonth} beliefen sich deine Freizeit- und Essensausgaben auf ${formatEuro(currentSpend)}; in den Vormonaten gab es keine Ausgaben dieser Kategorie.`);
      }
    }
    const latest = months.at(-1);
    const latestExpenses = latest.total;
    const averageExpenses = mean(months.map(({ total }) => total)) ?? 0;
    sentences.push(`${new Intl.DateTimeFormat("de-DE", { month: "long" }).format(latest.date)} beliefen sich deine Ausgaben auf ${formatEuro(latestExpenses)}; der Monatsdurchschnitt beträgt ${formatEuro(averageExpenses)}.`);
  }
  const income = ordered.filter(({ betrag }) => betrag > 0).reduce((sum, item) => sum + item.betrag, 0);
  const expenses = ordered.filter(({ betrag }) => betrag < 0).reduce((sum, item) => sum + Math.abs(item.betrag), 0);
  sentences.push(income ? `Deine Sparquote im aktuellen Filter liegt bei ${percentFormat.format((income - expenses) / income * 100)} % (${formatEuro(income - expenses)} Netto-Cashflow).` : "Im aktuellen Filter sind keine Einnahmen enthalten; deshalb ist keine Sparquote berechenbar.");
  const categories = new Map();
  for (const item of ordered.filter(({ betrag }) => betrag < 0)) categories.set(item.kategorie, (categories.get(item.kategorie) ?? 0) + Math.abs(item.betrag));
  const largestCategory = [...categories.entries()].sort((a, b) => b[1] - a[1])[0];
  if (largestCategory) sentences.push(`Der größte Ausgabenposten ist ${largestCategory[0]} mit ${formatEuro(largestCategory[1])} (${percentFormat.format(expenses ? largestCategory[1] / expenses * 100 : 0)} % der Ausgaben).`);
  const weekend = ordered.filter(({ betrag, datum }) => betrag < 0 && (datum.getDay() === 0 || datum.getDay() === 6)).reduce((sum, item) => sum + Math.abs(item.betrag), 0);
  const weekdays = ordered.filter(({ betrag, datum }) => betrag < 0 && datum.getDay() !== 0 && datum.getDay() !== 6).reduce((sum, item) => sum + Math.abs(item.betrag), 0);
  sentences.push(`Am Wochenende entfielen ${formatEuro(weekend)} deiner Ausgaben; an Werktagen waren es ${formatEuro(weekdays)}.`);
  const list = $("#insights-list");
  list.replaceChildren(...sentences.slice(0, 5).map((text) => {
    const item = document.createElement("li");
    item.textContent = text;
    return item;
  }));
}

function renderMonthComparison(transactions) {
  const months = groupByMonth(transactions);
  const selects = [$("#compare-month-a"), $("#compare-month-b")];
  const previous = selects.map((select) => select.value);
  for (const select of selects) {
    select.replaceChildren(...months.map(([key, group]) => {
      const option = document.createElement("option");
      option.value = key;
      option.textContent = new Intl.DateTimeFormat("de-DE", { month: "short", year: "numeric" }).format(group.date);
      return option;
    }));
  }
  selects[0].value = months.some(([key]) => key === previous[0]) ? previous[0] : months.at(-2)?.[0] ?? months[0]?.[0] ?? "";
  selects[1].value = months.some(([key]) => key === previous[1]) ? previous[1] : months.at(-1)?.[0] ?? months[0]?.[0] ?? "";
  const render = () => {
    const monthA = months.find(([key]) => key === selects[0].value);
    const monthB = months.find(([key]) => key === selects[1].value);
    const shortMonth = (entry) => entry ? new Intl.DateTimeFormat("de-DE", { month: "short", year: "2-digit" }).format(entry[1].date) : "–";
    $("#compare-label-a").textContent = shortMonth(monthA);
    $("#compare-label-b").textContent = shortMonth(monthB);
    const totals = (entry) => {
      const result = new Map();
      for (const item of entry?.[1].items ?? []) if (item.betrag < 0) result.set(item.kategorie, (result.get(item.kategorie) ?? 0) + Math.abs(item.betrag));
      return result;
    };
    const valuesA = totals(monthA);
    const valuesB = totals(monthB);
    const categories = [...new Set([...valuesA.keys(), ...valuesB.keys()])].sort((a, b) => a.localeCompare(b, "de"));
    const rows = categories.map((category) => {
      const first = valuesA.get(category) ?? 0;
      const second = valuesB.get(category) ?? 0;
      const difference = first ? (second - first) / first * 100 : second ? null : 0;
      return { category, first, second, difference };
    });
    const body = $("#month-compare-rows");
    body.replaceChildren(...(rows.length ? rows.map((row) => {
      const tr = document.createElement("tr");
      const category = document.createElement("td");
      category.textContent = row.category;
      const first = document.createElement("td");
      first.textContent = formatEuro(row.first);
      const second = document.createElement("td");
      second.textContent = formatEuro(row.second);
      const change = document.createElement("td");
      change.className = row.difference === null ? "" : row.difference > 0 ? "money-negative" : row.difference < 0 ? "money-positive" : "";
      change.textContent = row.difference === null ? "Neu" : `${row.difference > 0 ? "+" : ""}${percentFormat.format(row.difference)} %`;
      tr.append(category, first, second, change);
      return tr;
    }) : (() => {
      const tr = document.createElement("tr");
      const empty = document.createElement("td");
      empty.colSpan = 4;
      empty.textContent = "Für den Vergleich liegen keine Buchungen vor.";
      tr.append(empty);
      return [tr];
    })()));
  };
  for (const select of selects) select.onchange = render;
  render();
}

function renderDataQuality() {
  const errors = [];
  buchungen.forEach((item, index) => {
    const previous = index === 0 ? START_SALDO : buchungen[index - 1].saldo;
    if (Math.round(item.saldo * 100) !== Math.round((previous + item.betrag) * 100)) errors.push({ row: index + 2, item, expected: previous + item.betrag });
  });
  const status = $("#data-quality-status");
  const details = $("#data-quality-details");
  status.classList.toggle("is-valid", errors.length === 0);
  status.classList.toggle("is-invalid", errors.length > 0);
  status.textContent = errors.length ? `⚠ ${errors.length} fehlerhafte Zeile${errors.length === 1 ? "" : "n"}` : "✓ Alle Salden konsistent";
  details.replaceChildren();
  if (!errors.length) {
    const note = document.createElement("p");
    note.textContent = `Alle ${buchungen.length} Buchungen sind konsistent. Startsaldo vor der ersten Buchung: ${formatEuro(START_SALDO)}.`;
    details.append(note);
    return;
  }
  for (const error of errors) {
    const line = document.createElement("p");
    line.textContent = `CSV-Zeile ${error.row} (${dateLongFormat.format(error.item.datum)}): erwartet ${formatEuro(error.expected)}, gefunden ${formatEuro(error.item.saldo)}.`;
    details.append(line);
  }
}

function renderSimulator(transactions) {
  const ordered = [...transactions].sort((a, b) => a.datum - b.datum || a.id - b.id);
  const months = groupByMonth(ordered);
  const monthCount = Math.max(1, months.length);
  const monthlyAverage = (predicate, amount) => months.reduce((sum, [, month]) => sum + month.items.filter(predicate).reduce((subtotal, item) => subtotal + amount(item), 0), 0) / monthCount;
  const monthlyIncome = monthlyAverage(({ betrag }) => betrag > 0, ({ betrag }) => betrag);
  const monthlyExpenses = monthlyAverage(({ betrag }) => betrag < 0, ({ betrag }) => Math.abs(betrag));
  const monthlySalary = monthlyAverage(({ betrag, kategorie }) => betrag > 0 && kategorie === "Lohn", ({ betrag }) => betrag);
  const monthlyLeisure = monthlyAverage(({ betrag, kategorie }) => betrag < 0 && kategorie === "Freizeit & Essen", ({ betrag }) => Math.abs(betrag));
  const spotify = monthlyAverage(({ betrag, empfaenger }) => betrag < 0 && /spotify/i.test(empfaenger), ({ betrag }) => Math.abs(betrag));
  const netflix = monthlyAverage(({ betrag, empfaenger }) => betrag < 0 && /netflix/i.test(empfaenger), ({ betrag }) => Math.abs(betrag));
  const baselineNet = monthlyIncome - monthlyExpenses;
  const cancelSavings = ($("#cancel-spotify").checked ? spotify : 0) + ($("#cancel-netflix").checked ? netflix : 0);
  const salaryAdjustment = monthlySalary * Number($("#salary-change").value) / 100;
  const leisureChange = Number($("#leisure-change").value) / 100;
  const leisureSavings = -monthlyLeisure * leisureChange;
  const scenarioNet = baselineNet + cancelSavings + salaryAdjustment + leisureSavings;
  const addedYearly = (scenarioNet - baselineNet) * 12;
  $("#salary-change-label").textContent = `${Number($("#salary-change").value) > 0 ? "+" : ""}${$("#salary-change").value} %`;
  $("#leisure-change-label").textContent = `${Number($("#leisure-change").value) > 0 ? "+" : ""}${$("#leisure-change").value} %`;
  $("#simulator-yearly-saving").textContent = formatEuro(addedYearly);
  const currentBalance = ordered.at(-1)?.saldo ?? 0;
  $("#simulator-projected-balance").textContent = formatEuro(currentBalance + scenarioNet * 12);

  const previous = Chart.getChart($("#simulator-chart"));
  if (previous) {
    previous.destroy();
    const index = chartInstances.indexOf(previous);
    if (index >= 0) chartInstances.splice(index, 1);
  }
  if (typeof Chart === "undefined") return;
  const futureLabels = [];
  const baseline = [];
  const projected = [];
  const anchor = ordered.at(-1)?.datum ?? new Date();
  for (let month = 0; month <= 12; month += 1) {
    const date = new Date(anchor.getFullYear(), anchor.getMonth() + month, 1);
    futureLabels.push(new Intl.DateTimeFormat("de-DE", { month: "short", year: "2-digit" }).format(date));
    baseline.push(currentBalance + baselineNet * month);
    projected.push(currentBalance + scenarioNet * month);
  }
  const options = chartOptions({ legend: true, tooltipLabel: (context) => `${context.dataset.label}: ${formatEuro(context.parsed.y)}` });
  options.plugins.legend = { display: true, position: "bottom", labels: { color: chartTextColor(), usePointStyle: true, font: { size: 10 } } };
  const chart = new Chart($("#simulator-chart"), {
    type: "line",
    data: { labels: futureLabels, datasets: [
      { label: "Ohne Änderungen", data: baseline, borderColor: "#8299c0", borderDash: [4, 4], pointRadius: 0, tension: 0.2 },
      { label: "Dein Szenario", data: projected, borderColor: "#4dd8d0", backgroundColor: "rgba(77, 216, 208, 0.1)", fill: true, pointRadius: 0, tension: 0.2 }
    ] },
    options
  });
  chartInstances.push(chart);
}

function renderSavingsGoal(transactions) {
  const ordered = [...transactions].sort((a, b) => a.datum - b.datum || a.id - b.id);
  const currentBalance = ordered.at(-1)?.saldo ?? 0;
  const income = ordered.filter(({ betrag }) => betrag > 0).reduce((sum, item) => sum + item.betrag, 0);
  const expense = ordered.filter(({ betrag }) => betrag < 0).reduce((sum, item) => sum + Math.abs(item.betrag), 0);
  const months = Math.max(1, groupByMonth(ordered).length);
  const monthlyPace = (income - expense) / months;
  const goal = Math.max(1, Number($("#goal-amount").value) || 1);
  const dueDate = $("#goal-date").value ? new Date(`${$("#goal-date").value}T00:00:00`) : new Date();
  const now = new Date();
  const monthsLeft = Math.max(1, (dueDate.getFullYear() - now.getFullYear()) * 12 + dueDate.getMonth() - now.getMonth());
  const remaining = Math.max(0, goal - currentBalance);
  const monthlyNeeded = remaining / monthsLeft;
  const attainable = remaining === 0 || monthlyPace >= monthlyNeeded;
  const progress = clamp(currentBalance / goal * 100, 0, 100);
  $("#goal-progress").textContent = `${Math.round(progress)} %`;
  $("#goal-ring").style.setProperty("--goal-progress", `${progress}%`);
  $("#goal-ring").setAttribute("aria-label", `${Math.round(progress)} Prozent des Sparziels von ${formatEuro(goal)} erreicht.`);
  $("#goal-current-balance").textContent = formatEuro(currentBalance);
  $("#goal-remaining").textContent = formatEuro(remaining);
  $("#goal-status").textContent = remaining === 0 ? "Ziel bereits erreicht!" : attainable ? "Das Ziel ist erreichbar." : "Das Ziel ist aktuell nicht erreichbar.";
  $("#goal-monthly-needed").textContent = remaining ? `Benötigt: ${formatEuro(monthlyNeeded)} pro Monat.` : "Du hast dein Ziel bereits erreicht.";
  $("#goal-current-pace").textContent = `Aktuelles Tempo: ${formatEuro(monthlyPace)} pro Monat. ${attainable && remaining ? "Du liegst im Plan." : !attainable ? `Es fehlen ${formatEuro(monthlyNeeded - monthlyPace)} pro Monat.` : ""}`;
}

function setCrossFilter(filter) {
  activeFilter = filter;
  applyTransactionFilters();
  $("#active-filter-chip")?.scrollIntoView({ behavior: "smooth", block: "nearest" });
}

function clearCrossFilter() {
  activeFilter = null;
  applyTransactionFilters();
}

function renderWaterfall(transactions, initialMonth) {
  const select = $("#waterfall-month");
  const months = groupByMonth(transactions);
  if (!months.length) {
    select.replaceChildren();
    const existing = Chart.getChart($("#waterfall-chart"));
    if (existing) {
      existing.destroy();
      chartInstances.splice(chartInstances.indexOf(existing), 1);
    }
    return;
  }
  const previous = select.value;
  select.replaceChildren(...months.map(([key, group]) => {
    const option = document.createElement("option");
    option.value = key;
    option.textContent = new Intl.DateTimeFormat("de-DE", { month: "long", year: "numeric" }).format(group.date);
    return option;
  }));
  select.value = months.some(([key]) => key === previous) ? previous : (months.some(([key]) => key === initialMonth) ? initialMonth : months[0][0]);

  const draw = () => {
    const [monthKey, month] = months.find(([key]) => key === select.value) ?? months[0];
    const monthStartIndex = buchungen.findIndex(({ datum }) => isoDate(new Date(datum.getFullYear(), datum.getMonth(), 1)) === `${monthKey}-01`);
    const startBalance = monthStartIndex > 0 ? buchungen[monthStartIndex - 1].saldo : START_SALDO;
    const income = month.items.filter(({ betrag }) => betrag > 0).reduce((sum, item) => sum + item.betrag, 0);
    const byCategory = new Map();
    for (const item of month.items.filter(({ betrag }) => betrag < 0)) {
      byCategory.set(item.kategorie, (byCategory.get(item.kategorie) ?? 0) + Math.abs(item.betrag));
    }
    const steps = [{ label: "Startsaldo", amount: startBalance, type: "total" }];
    let running = startBalance;
    if (income) {
      steps.push({ label: "Einnahmen", from: running, to: running + income, type: "income" });
      running += income;
    }
    for (const [category, total] of [...byCategory.entries()].sort((a, b) => b[1] - a[1])) {
      steps.push({ label: category, from: running - total, to: running, type: "expense" });
      running -= total;
    }
    const endBalance = month.items.at(-1)?.saldo ?? running;
    steps.push({ label: "Endsaldo", amount: endBalance, type: "total" });

    const old = Chart.getChart($("#waterfall-chart"));
    if (old) {
      old.destroy();
      chartInstances.splice(chartInstances.indexOf(old), 1);
    }
    addChart("waterfall-chart", {
      type: "bar",
      data: {
        labels: steps.map(({ label }) => label),
        datasets: [{
          label: "Kontostand",
          data: steps.map((step) => step.type === "total" ? [0, step.amount] : [step.from, step.to]),
          backgroundColor: steps.map((step) => step.type === "income" ? "#4dd8d0" : step.type === "expense" ? "rgba(92, 149, 245, 0.78)" : "#82a9ef"),
          borderRadius: 4,
          barPercentage: 0.72
        }]
      },
      options: {
        ...chartOptions({ tooltipLabel: (context) => `${steps[context.dataIndex].label}: ${formatEuro(Math.abs((steps[context.dataIndex].to ?? steps[context.dataIndex].amount) - (steps[context.dataIndex].from ?? 0)))}` }),
        scales: {
          x: { grid: { display: false }, ticks: { color: chartTextColor(), maxRotation: 0, autoSkip: false, font: { size: 9 } } },
          y: { grid: { color: chartGridColor() }, ticks: { color: chartTextColor(), callback: (value) => formatEuro(value) } }
        }
      }
    });
  };
  select.onchange = draw;
  draw();
}

function renderHistogram(expenses) {
  const values = expenses.map(({ betrag }) => Math.abs(betrag));
  const step = 10;
  const maxAmount = Math.max(step, Math.ceil(Math.max(...values, 0) / step) * step);
  const bins = Array.from({ length: Math.ceil(maxAmount / step) }, (_, index) => ({
    start: index * step,
    count: values.filter((value) => value >= index * step && (value < (index + 1) * step || index === Math.ceil(maxAmount / step) - 1)).length
  }));
  const average = mean(values) ?? 0;
  const med = median(values) ?? 0;
  const markerIndex = (value) => Math.min(bins.length - 1, Math.floor(value / step));
  const options = chartOptions({
    tooltipLabel: (context) => `${context.label}: ${context.parsed.y} Buchungen`
  });
  options.plugins.financeGuides = {
    markers: [
      { index: markerIndex(average), color: "#4dd8d0" },
      { index: markerIndex(med), color: "#9dc9ff" }
    ]
  };
  options.scales.y.ticks.callback = (value) => `${value}`;
  addChart("histogram-chart", {
    type: "bar",
    data: {
      labels: bins.map(({ start }) => `${start}–${start + step} €`),
      datasets: [{ label: "Buchungen", data: bins.map(({ count }) => count), backgroundColor: "rgba(92, 149, 245, 0.75)", borderRadius: 4, categoryPercentage: 1, barPercentage: 0.95 }]
    },
    options
  });
}

function renderHeatmap(transactions) {
  const grid = $("#heatmap-grid");
  const monthsElement = $("#heatmap-months");
  const expensesByDate = new Map();
  for (const item of transactions) {
    if (item.betrag < 0) expensesByDate.set(isoDate(item.datum), (expensesByDate.get(isoDate(item.datum)) ?? 0) + Math.abs(item.betrag));
  }
  const first = transactions.length ? new Date(transactions[0].datum) : new Date(2026, 0, 1);
  const last = transactions.length ? new Date(transactions.at(-1).datum) : first;
  const start = new Date(first.getFullYear(), first.getMonth(), 1);
  start.setDate(start.getDate() - ((start.getDay() + 6) % 7));
  const end = new Date(last.getFullYear(), last.getMonth() + 1, 0);
  const totalWeeks = Math.ceil((end - start + 86400000) / (7 * 86400000));
  const maxDaily = Math.max(...expensesByDate.values(), 1);
  grid.style.gridTemplateColumns = `repeat(${totalWeeks}, 12px)`;
  grid.replaceChildren();
  monthsElement.replaceChildren();
  monthsElement.style.gridTemplateColumns = `repeat(${totalWeeks}, 12px)`;
  for (let month = new Date(first.getFullYear(), first.getMonth(), 1); month <= last; month = new Date(month.getFullYear(), month.getMonth() + 1, 1)) {
    const column = Math.floor((new Date(month.getFullYear(), month.getMonth(), 1) - start) / (7 * 86400000));
    const label = document.createElement("span");
    label.textContent = new Intl.DateTimeFormat("de-DE", { month: "short" }).format(month);
    label.style.gridColumn = `${column + 1} / span 4`;
    monthsElement.append(label);
  }
  const fragment = document.createDocumentFragment();
  for (let index = 0; index < totalWeeks * 7; index += 1) {
    const date = new Date(start);
    date.setDate(start.getDate() + index);
    const key = isoDate(date);
    const amount = expensesByDate.get(key) ?? 0;
    const button = document.createElement("button");
    button.type = "button";
    button.className = "heatmap-day";
    button.style.gridColumn = `${Math.floor(index / 7) + 1}`;
    button.style.gridRow = `${(index % 7) + 1}`;
    button.dataset.level = amount === 0 ? "0" : String(Math.min(4, Math.ceil(amount / maxDaily * 4)));
    button.title = `${dateLongFormat.format(date)} · Ausgaben: ${formatEuro(amount)}`;
    button.setAttribute("aria-label", button.title);
    button.disabled = !transactions.length || date < first || date > last;
    button.addEventListener("click", () => setCrossFilter({ type: "date", value: key, label: `Tag: ${dateLongFormat.format(date)}` }));
    fragment.append(button);
  }
  grid.append(fragment);
}

function renderWeekdayChart(expenses, transactions) {
  const labels = ["Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag", "Sonntag"];
  const totals = Array(7).fill(0);
  const counts = Array(7).fill(0);
  if (transactions.length) {
    const first = new Date(transactions[0].datum);
    const last = new Date(transactions.at(-1).datum);
    for (const expense of expenses) totals[(expense.datum.getDay() + 6) % 7] += Math.abs(expense.betrag);
    for (let day = new Date(first.getFullYear(), first.getMonth(), first.getDate()); day <= last; day.setDate(day.getDate() + 1)) counts[(day.getDay() + 6) % 7] += 1;
  }
  const options = chartOptions({ tooltipLabel: (context) => `Ø ${formatEuro(context.parsed.y)} pro Tag` });
  options.scales.y.beginAtZero = true;
  addChart("weekday-chart", {
    type: "bar",
    data: {
      labels: labels.map((label) => label.slice(0, 2)),
      datasets: [{ label: "Ø Ausgaben", data: totals.map((total, index) => counts[index] ? total / counts[index] : 0), backgroundColor: chartPalette.slice(0, 7), borderRadius: 5 }]
    },
    options
  });
}

function renderForecast(transactions) {
  const ordered = [...transactions].sort((a, b) => a.datum - b.datum || a.id - b.id);
  const canvas = $("#forecast-chart");
  if (ordered.length < 2) {
    $("#forecast-slope").textContent = "Nicht verfügbar";
    $("#forecast-r-squared").textContent = "Nicht verfügbar";
    return;
  }
  const origin = ordered[0].datum.getTime();
  const x = ordered.map(({ datum }) => (datum.getTime() - origin) / 86400000);
  const y = ordered.map(({ saldo }) => saldo);
  const xMean = mean(x);
  const yMean = mean(y);
  const sxx = x.reduce((sum, value) => sum + (value - xMean) ** 2, 0);
  const slope = x.reduce((sum, value, index) => sum + (value - xMean) * (y[index] - yMean), 0) / sxx;
  const intercept = yMean - slope * xMean;
  const predicted = x.map((value) => intercept + slope * value);
  const residuals = y.map((value, index) => value - predicted[index]);
  const residualVariance = residuals.reduce((sum, value) => sum + value ** 2, 0) / Math.max(1, y.length - 2);
  const totalVariation = y.reduce((sum, value) => sum + (value - yMean) ** 2, 0);
  const rSquared = totalVariation ? 1 - residuals.reduce((sum, value) => sum + value ** 2, 0) / totalVariation : 1;
  const lastDate = new Date(ordered.at(-1).datum);
  const forecastPoints = [];
  for (let month = new Date(lastDate.getFullYear(), lastDate.getMonth() + 1, 1); month <= new Date(2026, 8, 30); month = new Date(month.getFullYear(), month.getMonth() + 1, 1)) {
    const date = new Date(month.getFullYear(), month.getMonth() + 1, 0);
    if (date > lastDate) forecastPoints.push(date);
  }
  const forecastEnd = new Date(2026, 8, 30);
  if (forecastPoints.length === 0 || forecastPoints.at(-1).getTime() !== forecastEnd.getTime()) forecastPoints.push(forecastEnd);
  const labels = [...ordered.map(({ datum }) => datumFormat.format(datum)), ...forecastPoints.map((date) => datumFormat.format(date))];
  const fullX = [...x, ...forecastPoints.map((date) => (date.getTime() - origin) / 86400000)];
  const standardErrors = fullX.map((value) => Math.sqrt(residualVariance * (1 + 1 / y.length + ((value - xMean) ** 2 / sxx))));
  const futureOffset = y.length - 1;
  const lower = fullX.map((value, index) => index < futureOffset ? null : intercept + slope * value - 1.96 * standardErrors[index]);
  const upper = fullX.map((value, index) => index < futureOffset ? null : intercept + slope * value + 1.96 * standardErrors[index]);
  const fit = fullX.map((value, index) => index < futureOffset ? null : intercept + slope * value);
  const options = chartOptions({ tooltipLabel: (context) => `${context.dataset.label}: ${formatEuro(context.parsed.y)}` });
  options.plugins.legend = { display: true, position: "bottom", labels: { color: chartTextColor(), usePointStyle: true, boxWidth: 8, font: { size: 10 } } };
  options.scales.x.ticks.maxTicksLimit = 10;
  addChart("forecast-chart", {
    type: "line",
    data: {
      labels,
      datasets: [
        { label: "Saldo gebucht", data: [...y, ...forecastPoints.map(() => null)], borderColor: "#5c95f5", pointRadius: 0, tension: 0.2 },
        { label: "95-%-Band", data: lower, borderColor: "transparent", pointRadius: 0, fill: false },
        { label: "95-%-Band", data: upper, borderColor: "transparent", backgroundColor: "rgba(92, 149, 245, 0.15)", pointRadius: 0, fill: "-1" },
        { label: "Prognose", data: fit, borderColor: "#4dd8d0", borderDash: [6, 4], pointRadius: 0, tension: 0 }
      ]
    },
    options
  });
  $("#forecast-slope").textContent = `${formatEuro(slope * 30.4375)} / Monat`;
  $("#forecast-r-squared").textContent = new Intl.NumberFormat("de-DE", { style: "percent", maximumFractionDigits: 1 }).format(rSquared);
}

function setupAnalysisControls() {
  $("#active-filter-chip")?.setAttribute("hidden", "");
  $("#clear-filter")?.addEventListener("click", clearCrossFilter);
  $("#reset-balance-zoom")?.addEventListener("click", () => {
    const chart = Chart.getChart($("#balance-chart"));
    if (chart?.resetZoom) chart.resetZoom();
  });
  document.querySelectorAll("[data-download-chart]").forEach((button) => {
    button.addEventListener("click", () => {
      const chart = Chart.getChart($(`#${button.dataset.downloadChart}`));
      if (!chart) return;
      const link = document.createElement("a");
      link.href = chart.toBase64Image("image/png", 1);
      link.download = `${button.dataset.downloadChart}.png`;
      link.click();
    });
  });
  $("[data-download-heatmap]")?.addEventListener("click", () => {
    const grid = $("#heatmap-grid");
    const columns = Number.parseInt(grid.style.gridTemplateColumns.match(/\d+/)?.[0] ?? "0", 10);
    if (!columns) return;
    const cellSize = 12;
    const gap = 3;
    const canvas = document.createElement("canvas");
    canvas.width = columns * (cellSize + gap) - gap;
    canvas.height = 7 * (cellSize + gap) - gap;
    const context = canvas.getContext("2d");
    context.fillStyle = getComputedStyle(document.documentElement).getPropertyValue("--page").trim();
    context.fillRect(0, 0, canvas.width, canvas.height);
    for (const cell of grid.querySelectorAll(".heatmap-day:not(:disabled)")) {
      const column = Number.parseInt(cell.style.gridColumn, 10) - 1;
      const row = Number.parseInt(cell.style.gridRow, 10) - 1;
      context.fillStyle = getComputedStyle(cell).backgroundColor;
      context.fillRect(column * (cellSize + gap), row * (cellSize + gap), cellSize, cellSize);
    }
    const link = document.createElement("a");
    link.href = canvas.toDataURL("image/png");
    link.download = "ausgaben-kalender.png";
    link.click();
  });
}

const outlierIds = new Set();
for (const category of CATEGORY_CONFIG) {
  const amounts = buchungen.filter((item) => item.kategorie === category.name && item.betrag < 0).map((item) => Math.abs(item.betrag));
  const average = mean(amounts);
  const deviation = sd(amounts);
  if (average === null || !deviation) continue;
  for (const item of buchungen) {
    if (item.kategorie === category.name && item.betrag < 0 && Math.abs((Math.abs(item.betrag) - average) / deviation) > 2) outlierIds.add(item.id);
  }
}

function getFilteredTransactions() {
  const query = transactionFilters.search.trim().toLocaleLowerCase("de-DE");
  return buchungen.filter((item) => {
    const date = isoDate(item.datum);
    if (query && !`${item.empfaenger} ${item.zweck}`.toLocaleLowerCase("de-DE").includes(query)) return false;
    if (transactionFilters.from && date < transactionFilters.from) return false;
    if (transactionFilters.to && date > transactionFilters.to) return false;
    if (!selectedCategories.has(item.kategorie)) return false;
    if (transactionFilters.payment && item.zahlungsart !== transactionFilters.payment) return false;
    if (transactionFilters.flow === "income" && item.betrag <= 0) return false;
    if (transactionFilters.flow === "expense" && item.betrag >= 0) return false;
    const magnitude = Math.abs(item.betrag);
    if (magnitude < transactionFilters.amountMin || magnitude > transactionFilters.amountMax) return false;
    const weekday = (item.datum.getDay() + 6) % 7;
    if (transactionFilters.weekday === "weekend" && weekday < 5) return false;
    if (transactionFilters.weekday === "weekdays" && weekday >= 5) return false;
    if (/^[0-6]$/.test(transactionFilters.weekday) && weekday !== Number(transactionFilters.weekday)) return false;
    if (activeFilter?.type === "category" && item.kategorie !== activeFilter.value) return false;
    if (activeFilter?.type === "month" && date.slice(0, 7) !== activeFilter.value) return false;
    if (activeFilter?.type === "date" && date !== activeFilter.value) return false;
    return true;
  });
}

function applyTransactionFilters() {
  renderDashboard(getFilteredTransactions());
}

function compareTransactions(left, right, key) {
  const leftValue = key === "empfaenger" ? `${left.empfaenger} ${left.kategorie}` : key === "betrag" ? left.betrag : left[key];
  const rightValue = key === "empfaenger" ? `${right.empfaenger} ${right.kategorie}` : key === "betrag" ? right.betrag : right[key];
  if (leftValue instanceof Date && rightValue instanceof Date) return leftValue - rightValue;
  if (typeof leftValue === "number" && typeof rightValue === "number") return leftValue - rightValue;
  return String(leftValue).localeCompare(String(rightValue), "de", { numeric: true, sensitivity: "base" });
}

function sortedTransactions(transactions) {
  return [...transactions].sort((left, right) => {
    for (const sort of transactionSort) {
      const compared = compareTransactions(left, right, sort.key) * sort.direction;
      if (compared) return compared;
    }
    return left.id - right.id;
  });
}

function groupLabel(item, grouping) {
  if (grouping === "month") return `${item.datum.getFullYear()}-${String(item.datum.getMonth() + 1).padStart(2, "0")}`;
  if (grouping === "category") return item.kategorie;
  if (grouping === "recipient") return item.empfaenger;
  if (grouping === "payment") return item.zahlungsart;
  return "";
}

function groupDisplayLabel(key, grouping) {
  if (grouping === "month") {
    const [year, month] = key.split("-").map(Number);
    return new Intl.DateTimeFormat("de-DE", { month: "long", year: "numeric" }).format(new Date(year, month - 1, 1));
  }
  return key;
}

function createTransactionRow(item) {
  const row = document.createElement("tr");
  row.className = "transaction-row";
  row.tabIndex = 0;
  row.dataset.transactionId = String(item.id);
  row.setAttribute("aria-label", `${dateLongFormat.format(item.datum)}, ${item.empfaenger}, ${formatEuro(item.betrag)}. Details öffnen.`);

  const dateCell = document.createElement("td");
  dateCell.textContent = dateLongFormat.format(item.datum);
  row.append(dateCell);

  const recipientCell = document.createElement("td");
  recipientCell.className = "recipient-cell";
  const recipientName = document.createElement("span");
  recipientName.className = "recipient-name";
  recipientName.textContent = item.empfaenger;
  recipientCell.append(recipientName);
  const category = categoryFor(item.kategorie);
  const badge = document.createElement("span");
  badge.className = "category-badge";
  badge.textContent = item.kategorie;
  badge.style.setProperty("--badge-color", category.color);
  badge.style.setProperty("--badge-background", category.background);
  recipientCell.append(badge);
  if (outlierIds.has(item.id)) {
    const warning = document.createElement("span");
    warning.className = "outlier-warning";
    warning.textContent = "⚠";
    warning.title = `Ausreißer: mehr als 2 Standardabweichungen über dem Mittelwert für ${item.kategorie}.`;
    warning.setAttribute("aria-label", warning.title);
    recipientCell.append(warning);
  }
  row.append(recipientCell);

  const purposeCell = document.createElement("td");
  purposeCell.className = "purpose-cell";
  purposeCell.textContent = item.zweck.length > 58 ? `${item.zweck.slice(0, 55)}…` : item.zweck;
  purposeCell.title = item.zweck;
  row.append(purposeCell);

  const paymentCell = document.createElement("td");
  paymentCell.className = "payment-cell";
  const paymentIcons = { Karte: "▣", Bargeld: "▤", Dauerauftrag: "↻", Lastschrift: "↙", Gutschrift: "↗", Überweisung: "⇄" };
  const paymentIcon = document.createElement("span");
  paymentIcon.className = "payment-method";
  paymentIcon.textContent = paymentIcons[item.zahlungsart] ?? "·";
  paymentIcon.title = item.zahlungsart;
  paymentIcon.setAttribute("aria-label", item.zahlungsart);
  paymentCell.append(paymentIcon, document.createTextNode(item.zahlungsart));
  row.append(paymentCell);

  for (const [value, label, className] of [[item.betrag, "Betrag", item.betrag >= 0 ? "money-positive" : "money-negative"], [item.saldo, "Kontostand", ""]]) {
    const cell = document.createElement("td");
    cell.className = `money numeric ${className}`;
    cell.dataset.label = label;
    cell.textContent = formatEuro(value);
    row.append(cell);
  }
  row.addEventListener("click", () => openTransactionDetails(item));
  row.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      openTransactionDetails(item);
    }
  });
  return row;
}

function renderTransactions(transactions = buchungen) {
  const sorted = sortedTransactions(transactions);
  const grouping = $("#transaction-grouping").value;
  const body = $("#transaction-rows");
  const fragment = document.createDocumentFragment();
  const groups = new Map();
  for (const item of sorted) {
    const key = grouping === "none" ? "" : groupLabel(item, grouping);
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key).push(item);
  }

  for (const [key, items] of groups) {
    if (grouping !== "none") {
      const groupRow = document.createElement("tr");
      groupRow.className = "transaction-group-row";
      const groupCell = document.createElement("td");
      groupCell.colSpan = 6;
      const toggle = document.createElement("button");
      toggle.type = "button";
      toggle.className = "group-toggle";
      toggle.setAttribute("aria-expanded", String(!collapsedGroups.has(key)));
      const disclosure = document.createElement("span");
      disclosure.className = "group-disclosure";
      disclosure.textContent = collapsedGroups.has(key) ? "›" : "⌄";
      const label = document.createElement("strong");
      label.textContent = groupDisplayLabel(key, grouping);
      const total = items.reduce((sum, item) => sum + item.betrag, 0);
      const subtotal = document.createElement("span");
      subtotal.className = `group-subtotal ${total > 0 ? "money-positive" : total < 0 ? "money-negative" : ""}`;
      subtotal.textContent = `Zwischensumme ${formatEuro(total)} · ${items.length} Buchungen`;
      toggle.append(disclosure, label, subtotal);
      toggle.addEventListener("click", () => {
        if (collapsedGroups.has(key)) collapsedGroups.delete(key);
        else collapsedGroups.add(key);
        renderTransactions(currentTransactions);
      });
      groupCell.append(toggle);
      groupRow.append(groupCell);
      fragment.append(groupRow);
      if (collapsedGroups.has(key)) continue;
    }
    for (const item of items) fragment.append(createTransactionRow(item));
  }
  if (!transactions.length) {
    const emptyRow = document.createElement("tr");
    emptyRow.className = "empty-transaction-row";
    const emptyCell = document.createElement("td");
    emptyCell.colSpan = 6;
    emptyCell.textContent = "Keine Buchungen entsprechen diesen Filtern.";
    emptyRow.append(emptyCell);
    fragment.append(emptyRow);
  }
  body.replaceChildren(fragment);
  $("#transaction-count-label").textContent = `${transactions.length} Buchungen`;
  $("#transaction-total").textContent = formatEuro(transactions.reduce((sum, item) => sum + item.betrag, 0));
  updateSortIndicators();
}

function updateSortIndicators() {
  for (const button of document.querySelectorAll(".sort-button")) {
    const current = transactionSort.find(({ key }) => key === button.dataset.sort);
    const indicator = button.querySelector(".sort-indicator");
    indicator.textContent = current ? current.direction === 1 ? " ↑" : " ↓" : "";
    button.setAttribute("aria-sort", current ? current.direction === 1 ? "ascending" : "descending" : "none");
  }
}

function openTransactionDetails(item) {
  const dialog = $("#transaction-detail");
  $("#detail-title").textContent = item.empfaenger;
  const fields = [
    ["Datum", dateLongFormat.format(item.datum)], ["Empfänger / Auftraggeber", item.empfaenger],
    ["Verwendungszweck", item.zweck], ["Betrag", formatEuro(item.betrag)], ["Kontostand", formatEuro(item.saldo)],
    ["Kategorie", item.kategorie], ["Zahlungsart", item.zahlungsart], ["Wochentag", item.wochentag],
    ["Monat", item.monat], ["Buchungs-ID", String(item.id)]
  ];
  const details = $("#transaction-detail-fields");
  details.replaceChildren();
  for (const [label, value] of fields) {
    const term = document.createElement("dt");
    term.textContent = label;
    const description = document.createElement("dd");
    description.textContent = value;
    details.append(term, description);
  }
  const related = $("#related-transaction-list");
  related.replaceChildren();
  const others = sortedTransactions(buchungen.filter((transaction) => transaction.empfaenger === item.empfaenger && transaction.id !== item.id));
  if (!others.length) {
    const empty = document.createElement("p");
    empty.className = "related-empty";
    empty.textContent = "Keine weiteren Buchungen bei diesem Empfänger.";
    related.append(empty);
  }
  for (const transaction of others) {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "related-transaction";
    const date = document.createElement("span");
    date.textContent = dateLongFormat.format(transaction.datum);
    const amount = document.createElement("strong");
    amount.className = transaction.betrag >= 0 ? "money-positive" : "money-negative";
    amount.textContent = formatEuro(transaction.betrag);
    button.append(date, amount);
    button.addEventListener("click", () => openTransactionDetails(transaction));
    related.append(button);
  }
  if (!dialog.open) dialog.showModal();
}

function setupTransactionFilters() {
  const firstDate = isoDate(buchungen[0].datum);
  const lastDate = isoDate(buchungen.at(-1).datum);
  $("#date-from").value = firstDate;
  $("#date-from").min = firstDate;
  $("#date-from").max = lastDate;
  $("#date-to").value = lastDate;
  $("#date-to").min = firstDate;
  $("#date-to").max = lastDate;
  const maxAmount = Math.ceil(Math.max(...buchungen.map(({ betrag }) => Math.abs(betrag))));
  for (const id of ["amount-min", "amount-max"]) {
    $( `#${id}`).max = String(maxAmount);
  }
  $("#amount-max").value = String(maxAmount);
  transactionFilters.amountMax = maxAmount;
  const paymentFilter = $("#payment-filter");
  for (const payment of [...new Set(buchungen.map(({ zahlungsart }) => zahlungsart))].sort((a, b) => a.localeCompare(b, "de"))) {
    const option = document.createElement("option");
    option.value = payment;
    option.textContent = payment;
    paymentFilter.append(option);
  }
  const categoryChips = $("#category-filter-chips");
  for (const { name, color } of CATEGORY_CONFIG) {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "category-filter-chip is-selected";
    button.textContent = name;
    button.style.setProperty("--chip-color", color);
    button.setAttribute("aria-pressed", "true");
    button.addEventListener("click", () => {
      if (selectedCategories.has(name)) selectedCategories.delete(name);
      else selectedCategories.add(name);
      button.classList.toggle("is-selected", selectedCategories.has(name));
      button.setAttribute("aria-pressed", String(selectedCategories.has(name)));
      applyTransactionFilters();
    });
    categoryChips.append(button);
  }

  let searchDebounceTimer;
  $("#transaction-search").addEventListener("input", (event) => {
    window.clearTimeout(searchDebounceTimer);
    const search = event.target.value;
    searchDebounceTimer = window.setTimeout(() => {
      transactionFilters.search = search;
      applyTransactionFilters();
    }, 200);
  });
  for (const [id, key] of [["date-from", "from"], ["date-to", "to"], ["payment-filter", "payment"], ["flow-filter", "flow"], ["weekday-filter", "weekday"]]) {
    $(`#${id}`).addEventListener("change", (event) => {
      transactionFilters[key] = event.target.value;
      if (key === "from" || key === "to") $("#date-preset").value = "";
      applyTransactionFilters();
    });
  }
  $("#date-preset").addEventListener("change", (event) => {
    const latest = buchungen.at(-1).datum;
    let from = firstDate;
    if (event.target.value === "month") from = isoDate(new Date(latest.getFullYear(), latest.getMonth(), 1));
    if (event.target.value === "quarter") from = isoDate(new Date(latest.getFullYear(), Math.floor(latest.getMonth() / 3) * 3, 1));
    $("#date-from").value = from;
    $("#date-to").value = lastDate;
    transactionFilters.from = from;
    transactionFilters.to = lastDate;
    applyTransactionFilters();
  });
  const updateAmountRange = () => {
    let minimum = Number($("#amount-min").value);
    let maximum = Number($("#amount-max").value);
    if (minimum > maximum) {
      if (document.activeElement.id === "amount-min") maximum = minimum;
      else minimum = maximum;
      $("#amount-min").value = String(minimum);
      $("#amount-max").value = String(maximum);
    }
    transactionFilters.amountMin = minimum;
    transactionFilters.amountMax = maximum;
    $("#amount-range-label").textContent = `${formatEuro(minimum)} – ${formatEuro(maximum)}`;
    applyTransactionFilters();
  };
  $("#amount-min").addEventListener("input", updateAmountRange);
  $("#amount-max").addEventListener("input", updateAmountRange);
  $("#transaction-grouping").addEventListener("change", () => renderTransactions(currentTransactions));
  document.querySelectorAll(".sort-button").forEach((button) => {
    button.addEventListener("click", (event) => {
      const key = button.dataset.sort;
      const current = transactionSort.find((sort) => sort.key === key);
      const direction = current ? -current.direction : 1;
      transactionSort = event.shiftKey
        ? [...transactionSort.filter((sort) => sort.key !== key), { key, direction }].slice(-2)
        : [{ key, direction }];
      renderTransactions(currentTransactions);
    });
  });
  $("#reset-transaction-filters").addEventListener("click", () => {
    window.clearTimeout(searchDebounceTimer);
    transactionFilters.search = "";
    transactionFilters.from = "";
    transactionFilters.to = "";
    transactionFilters.payment = "";
    transactionFilters.flow = "all";
    transactionFilters.amountMin = 0;
    transactionFilters.amountMax = maxAmount;
    transactionFilters.weekday = "all";
    activeFilter = null;
    selectedCategories.clear();
    for (const { name } of CATEGORY_CONFIG) selectedCategories.add(name);
    $("#transaction-search").value = "";
    $("#date-from").value = firstDate;
    $("#date-to").value = lastDate;
    $("#date-preset").value = "";
    $("#payment-filter").value = "";
    $("#flow-filter").value = "all";
    $("#weekday-filter").value = "all";
    $("#amount-min").value = "0";
    $("#amount-max").value = String(maxAmount);
    $("#amount-range-label").textContent = `${formatEuro(0)} – ${formatEuro(maxAmount)}`;
    categoryChips.querySelectorAll(".category-filter-chip").forEach((button) => {
      button.classList.add("is-selected");
      button.setAttribute("aria-pressed", "true");
    });
    applyTransactionFilters();
  });
  $("#export-transactions").addEventListener("click", () => {
    const quoteCsv = (value) => {
      const text = String(value);
      return /[;"\r\n]/.test(text) ? `"${text.replace(/"/g, '""')}"` : text;
    };
    const csvRows = [
      ["Date", "Recipient/Payer", "Payment reference", "Amount", "Account balance", "Category"].join(";"),
      ...sortedTransactions(currentTransactions).map((item) => [
        `${String(item.datum.getDate()).padStart(2, "0")}.${String(item.datum.getMonth() + 1).padStart(2, "0")}.${item.datum.getFullYear()}`,
        item.empfaenger, item.zweck,
        item.betrag.toFixed(2).replace(".", ","), item.saldo.toFixed(2).replace(".", ","), item.kategorie
      ].map(quoteCsv).join(";"))
    ];
    const blob = new Blob(["\uFEFF", csvRows.join("\r\n")], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "buchungen-gefiltert.csv";
    link.click();
    window.setTimeout(() => URL.revokeObjectURL(url), 1000);
  });
  $("#close-transaction-detail").addEventListener("click", () => $("#transaction-detail").close());
  $("#transaction-detail").addEventListener("click", (event) => {
    if (event.target === event.currentTarget) event.currentTarget.close();
  });
}

function setupSimulatorControls() {
  const goalDate = new Date();
  goalDate.setFullYear(goalDate.getFullYear() + 1);
  $("#goal-date").value = isoDate(goalDate);
  for (const selector of ["#cancel-spotify", "#cancel-netflix"]) $(selector).addEventListener("change", () => renderSimulator(currentTransactions));
  for (const selector of ["#salary-change", "#leisure-change"]) $(selector).addEventListener("input", () => renderSimulator(currentTransactions));
  for (const selector of ["#goal-amount", "#goal-date"]) {
    $(selector).addEventListener("input", () => renderSavingsGoal(currentTransactions));
    $(selector).addEventListener("change", () => renderSavingsGoal(currentTransactions));
  }
}

function setupKeyboardShortcuts() {
  document.addEventListener("keydown", (event) => {
    const active = document.activeElement;
    const isEditing = active instanceof HTMLElement && (active.isContentEditable || ["INPUT", "TEXTAREA", "SELECT"].includes(active.tagName));
    if (event.key === "/" && !isEditing && !event.ctrlKey && !event.metaKey && !event.altKey) {
      event.preventDefault();
      $("#transaction-search").focus();
    } else if (event.key.toLowerCase() === "d" && !isEditing && !event.ctrlKey && !event.metaKey && !event.altKey) {
      $("#theme-toggle").click();
    } else if (event.key === "Escape") {
      const dialog = $("#transaction-detail");
      if (dialog.open) dialog.close();
      $("#data-quality").open = false;
    }
  });
}

setupAnalysisControls();
setupTransactionFilters();
setupSimulatorControls();
renderDashboard(buchungen);
setupKeyboardShortcuts();

function applyTheme(theme) {
  document.documentElement.dataset.theme = theme;
  const isLight = theme === "light";
  const toggle = $("#theme-toggle");
  toggle.setAttribute("aria-pressed", String(isLight));
  toggle.setAttribute("aria-label", isLight ? "Dunkles Design aktivieren" : "Helles Design aktivieren");
  toggle.querySelector(".theme-icon").textContent = isLight ? "☾" : "☼";
  toggle.querySelector(".theme-label").textContent = isLight ? "Dunkles Design" : "Helles Design";

  const styles = getComputedStyle(document.documentElement);
  const tickColor = styles.getPropertyValue("--chart-tick").trim();
  const gridColor = styles.getPropertyValue("--chart-grid").trim();
  for (const chart of chartInstances) {
    chart.options.color = tickColor;
    for (const scale of Object.values(chart.options.scales ?? {})) {
      if (scale.ticks) scale.ticks.color = tickColor;
      if (scale.grid && scale.grid.display !== false) scale.grid.color = gridColor;
    }
    if (chart.options.plugins.legend?.labels) chart.options.plugins.legend.labels.color = tickColor;
    chart.update("none");
  }
}

let savedTheme = "dark";
try {
  const storedTheme = localStorage.getItem("finance-dashboard-theme");
  if (storedTheme === "light" || storedTheme === "dark") savedTheme = storedTheme;
} catch (error) {
  console.warn("Designauswahl konnte nicht aus dem lokalen Speicher geladen werden.", error);
}
applyTheme(savedTheme);

$("#theme-toggle").addEventListener("click", () => {
  const nextTheme = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
  applyTheme(nextTheme);
  try {
    localStorage.setItem("finance-dashboard-theme", nextTheme);
  } catch (error) {
    console.warn("Designauswahl konnte nicht im lokalen Speicher gespeichert werden.", error);
  }
});

for (const link of document.querySelectorAll(".nav-link")) {
  link.addEventListener("click", () => {
    document.querySelectorAll(".nav-link").forEach((item) => item.classList.remove("active"));
    link.classList.add("active");
  });
}
