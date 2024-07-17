import './App.css';
import { useState } from 'react'
import { Label, Listbox, ListboxButton, ListboxOption, ListboxOptions } from '@headlessui/react'
import { ChevronUpDownIcon, CheckIcon } from '@heroicons/react/20/solid'

const colors = ["Yellow", "Red"]

function App() {
  const [selectedColor, setColor] = useState(colors[0])

  const changeColor = (value) => {
    console.log(value)
    setColor(value)
    // push to the color branch
  }

  const submitDeploy = async (e) => {
    console.log("+ selected color +", selectedColor)
    const resp = await fetch("https://api.github.com/repos/somnathbm/react-helloworld-argo-infra/dispatches", {
      method: "POST",
      headers: {
        "Accept": "application/vnd.github+json",
        "X-GitHub-Api-Version": "2022-11-28",
        "Authorization": "Bearer " + process.env.REACT_APP_GH_PAT
      },
      body: JSON.stringify({
        event_type: "react-hello-test",
        client_payload: {
          passed: true,
          selectedColor
        }
      })
    })

    const final_resp = resp.ok
    console.log(final_resp)
  }

  return (
    <div className="container">
      <div className="grid grid-cols-[70%_30%]">
        <div className="flex flex-row justify-center items-center w-full h-screen px-4" style={{ backgroundColor: 'teal' }}>
          <h1 className={`playwrite-cu-type clr-${process.env.REACT_APP_HLO_WRLD_CLR?.toLowerCase() || "white"}`}>Hello World!!</h1>
        </div>
        <div className="flex flex-col justify-center items-center w-full h-screen px-4" style={{ backgroundColor: 'gray' }}>
          <Listbox value={selectedColor} onChange={(value) => changeColor(value)}>
            <Label className="block text-sm font-medium leading-6 text-gray-900">Select color: </Label>
            <div className="relative mt-2">
              <ListboxButton className="relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm sm:leading-6">
                <span className="flex items-center">
                  <span className="ml-3 block truncate">{selectedColor}</span>
                </span>
                <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
                  <ChevronUpDownIcon aria-hidden="true" className="h-5 w-5 text-gray-400" />
                </span>
              </ListboxButton>

              <ListboxOptions
                transition
                className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none data-[closed]:data-[leave]:opacity-0 data-[leave]:transition data-[leave]:duration-100 data-[leave]:ease-in sm:text-sm"
              >
                {colors.map((color, index) => (
                  <ListboxOption
                    key={index}
                    value={color}
                    className="group relative cursor-default select-none py-2 pl-3 pr-9 text-gray-900 data-[focus]:bg-indigo-600 data-[focus]:text-white"
                  >
                    <div className="flex items-center">
                      <span className="ml-3 block truncate font-normal group-data-[selected]:font-semibold">
                        {color}
                      </span>
                    </div>

                    <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-indigo-600 group-data-[focus]:text-white [.group:not([data-selected])_&]:hidden">
                      <CheckIcon aria-hidden="true" className="h-5 w-5" />
                    </span>
                  </ListboxOption>
                ))}
              </ListboxOptions>
            </div>
          </Listbox>

          <button
            className="rounded-md bg-indigo-600 mt-5 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            type="button"
            onClick={submitDeploy}
            >
            Trigger manifest change & Deploy!
          </button>
        </div>
      </div>
    </div>
  )
}

export default App;
