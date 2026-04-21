// Impordime Reacti hook'i useState, mis võimaldab komponendil meeles hoida väärtusi
import { useState } from "react";

export default function App() {
  // 'a' on esimese kalkulaatori sisestusvälja väärtus
  // 'setA' on funktsioon, mis muudab 'a' väärtust
  const [a, setA] = useState("");

  // 'b' on teise kalkulaatori sisestusvälja väärtus
  // 'setB' muudab 'b' väärtust
  const [b, setB] = useState("");

  // 'task' hoiab ühe uue to-do ülesande teksti
  // 'setTask' uuendab seda
  const [task, setTask] = useState("");

  // 'list' on to-do list ehk massiiv kõigist ülesannetest
  // 'setList' võimaldab listi muuta
  const [list, setList] = useState<string[]>([]);

  // JSX — see on see, mis ekraanile kuvatakse
  return (
    // Lihtne konteiner, millele on lisatud natuke stiili
    <div style={{ padding: 20, fontFamily: "Arial" }}>
      <h1>Interaktiivne leht</h1>

      {/* --- KALKULAATOR --- */}
      <h2>Kalkulaator</h2>

      {/* Esimene number-input.
          value={a} tähendab, et sisestusvälja väärtus tuleb muutujast 'a'.
          onChange käivitub iga kord, kui kasutaja midagi kirjutab.
          setA uuendab 'a' väärtust. */}
      <input
        type="number"
        value={a}
        onChange={(e) => setA(e.target.value)}
      />

      {/* Teine number-input.
          Sama loogika nagu esimesel, ainult et see muudab 'b' väärtust. */}
      <input
        type="number"
        value={b}
        onChange={(e) => setB(e.target.value)}
        style={{ marginLeft: 10 }} // Lisab väikese vahe vasakule
      />

      {/* Tulemus arvutatakse otse JSX-is.
          Number(a) + Number(b) liidab kaks sisestatud arvu kokku. */}
      <p>Tulemus: {Number(a) + Number(b)}</p>

      {/* --- TO-DO LIST --- */}
      <h2>To-do list</h2>

      {/* Sisestusväli uue ülesande jaoks.
          'task' hoiab sisestatud teksti.
          onChange uuendab 'task' väärtust iga klahvivajutusega. */}
      <input
        value={task}
        onChange={(e) => setTask(e.target.value)}
      />

      {/* Nupp, mis lisab uue ülesande listi.
          Kui tekst pole tühi, lisatakse see listi ja sisestusväli tühjendatakse. */}
      <button
        onClick={() => {
          // Kontroll: kas tekst pole tühi
          if (task.trim()) {
            // Loome uue listi, lisades lõppu uue ülesande
            setList([...list, task]);

            // Tühjendame sisestusvälja
            setTask("");
          }
        }}
        style={{ marginLeft: 10 }} // Vahe sisestusväljast
      >
        Lisa
      </button>

      {/* Kuvame kõik ülesanded <ul> sees.
          list.map() käib läbi kõik elemendid ja loob igaühe jaoks <li>.
          'key' on Reacti nõue, et igal elemendil oleks unikaalne võti. */}
      <ul>
        {list.map((t, i) => (
          <li key={i}>{t}</li>
        ))}
      </ul>
    </div>
  );
}
