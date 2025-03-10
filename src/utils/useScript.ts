import { useEffect, useState } from "react";

export interface ScriptProps {
    src: HTMLScriptElement["src"];

    [key: string]: any;
}

// Hook
let cachedScripts = [];

export function useScript(src: string) {
    // Keeping track of script loaded and error state
    const [state, setState] = useState({
        loaded: false,
        error: false,
    });

    useEffect(
        () => {
            // If cachedScripts array already includes src that means another instance ...
            // ... of this hook already loaded this script, so no need to load again.
            if (cachedScripts.includes(src)) {
                setState({
                    loaded: true,
                    error: false,
                });
            } else {
                cachedScripts.push(src);

                // Create script
                let script = document.createElement("script");
                script.src = src;
                script.async = true;
                // scriptEl.setAttribute('src', src);

                // Object.keys(attributes).forEach((key) => {
                //     if (scriptEl[key] === undefined) {
                //         scriptEl.setAttribute(key, attributes[key]);
                //     } else {
                //         scriptEl[key] = attributes[key];
                //     }
                // });
                // Script event listener callbacks for load and error
                const onScriptLoad = () => {
                    setState({
                        loaded: true,
                        error: false,
                    });
                };

                const onScriptError = () => {
                    // Remove from cachedScripts we can try loading again
                    const index = cachedScripts.indexOf(src);
                    if (index >= 0) cachedScripts.splice(index, 1);
                    script.remove();

                    setState({
                        loaded: true,
                        error: true,
                    });
                };

                script.addEventListener("load", onScriptLoad);
                script.addEventListener("error", onScriptError);

                // Add script to document body
                document.body.appendChild(script);

                // Remove event listeners on cleanup
                return () => {
                    script.removeEventListener("load", onScriptLoad);
                    script.removeEventListener("error", onScriptError);
                };
            }
        },
        [src] // Only re-run effect if script src changes
    );

    return [state.loaded, state.error];
}

// // Usage
// function App() {
//   const [loaded, error] = useScript(
//     'https://pm28k14qlj.codesandbox.io/test-external-script.js'
//   );

//   return (
//     <div>
//       <div>
//         Script loaded: <b>{loaded.toString()}</b>
//       </div>
//       {loaded && !error && (
//         <div>
//           Script function call response: <b>{TEST_SCRIPT.start()}</b>
//         </div>
//       )}
//     </div>
//   );
// }
// useScript({
//   src: 'https://js.stripe.com/v3/',
//   onload: () => console.log('Script loaded!')
// })
