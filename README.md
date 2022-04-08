# Funções de formatação de Angulo

Como usar?

```shell
yarn add https://git.solutionsoftwares.com.br/site-group/format
```

```ts
import { Format, Units } from "format";

console.log(Format.stringToDegree("21.613740790767654", "%.14f")) // 21.61374079076765
console.log(Format.stringToDegreeMinute("21°36.82444744605924'", "%2d°%.14f'")) // 21°36.82444744605914'
console.log(Format.stringToDegreeMinuteSecond("21°36'49.46684676355439\"", "%d°%d'%.14f\"")) // 21°36'49.46684676354926\"
console.log(Format.stringToRadian("21.613740790767654")) // 0.37723094047149835
console.log(Format.stringToRadian("21°36.82444744605924'", Units.DegreeMinute)) // 0.37723094047149835
console.log(Format.stringToRadian("21°36'49.46684676355439\"", Units.DegreeMinuteSecond)) // 0.37723094047149835
console.log(Format.degreeToRadian("21.613740790767654")) // 0.37723094047149835
console.log(Format.degreeMinuteToRadian("21°36.82444744605924'")) // 0.37723094047149835
console.log(Format.degreeMinuteToRadian("-21°36.82444744605924'")) // -0.37723094047149835
console.log(Format.degreeMinuteToRadian("21 36.82444744605924")) // 0.37723094047149835
console.log(Format.degreeMinuteToRadian("21 36")) // 0.37699111843077515
console.log(Format.degreeMinuteToRadian("21")) // throw Dados invalidos!
console.log(Format.degreeMinuteSecondToRadian("21°36'49.46684676355439\"")) // 0.37723094047149835
console.log(Format.degreeMinuteSecondToRadian("21 36 49.46684676355439")) // 0.37723094047149835
console.log(Format.degreeMinuteSecondToRadian("21 36 49")) // 0.37722867713451885
console.log(Format.degreeMinuteSecondToRadian("21 36")) // throw Dados invalidos!
console.log(Format.radianToDegree(0.37723094047149835, "%.14f")) // 21.61374079076765
console.log(Format.radianToDegree(0.37723094047149835, "%f°%f'%f")) // throw Formato invalido!
console.log(Format.radianToDegreeMinute(0.37723094047149835, "%2d°%.14f'")) // 21°36.82444744605914'
console.log(Format.radianToDegreeMinuteSecond(0.37723094047149835, "%d°%d'%.14f\"")) // 21°36'49.46684676354926\"
console.log(Format.stringToDegreeMinuteSecond("36°00'00\"NE", "%d°%d'%.14f\"")) // Rumo NE => 36°0'0.00000000000000\"
console.log(Format.stringToDegreeMinuteSecond("46°00'00\"SE", "%d°%d'%.14f\"")) // Rumo SE => 134°0'0.00000000011642\"
console.log(Format.stringToDegreeMinuteSecond("28°00'00\"SW", "%d°%d'%.14f\"")) // Rumo SW => 207°59'59.99999999988358\"
console.log(Format.stringToDegreeMinuteSecond("62°00'00\"NW", "%d°%d'%.14f\"")) // Rumo NW => 298°0'0.00000000000000\"
```
