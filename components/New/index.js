export default function New({ navigateToPage }) {
  return (
    <div>
      <main>
        <h1>New Page ./components/New/index.js</h1>
        <p>{"[ - This is New page content - ]"}</p>
        <p onClick={() => navigateToPage("index")}>{"< Go Back"}</p>
      </main>
    </div>
  );
}
