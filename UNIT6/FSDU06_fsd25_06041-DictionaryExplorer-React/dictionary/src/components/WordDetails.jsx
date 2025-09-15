export default function WordDetails({ data, onSynonymClick }) {
  return (
    <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded shadow space-y-4">
      {data.map((entry, idx) => (
        <div key={idx} className="space-y-3">
          <h2 className="text-2xl font-bold">{entry.word}</h2>

          
          {entry.phonetics && entry.phonetics.length > 0 && (
            <div className="flex flex-wrap gap-3 items-center">
              {entry.phonetics.map((p, i) => (
                <div key={i} className="flex items-center gap-2">
                  {p.text && (
                    <span className="italic text-gray-600 dark:text-gray-300">
                      {p.text}
                    </span>
                  )}
                  {p.audio && (
                    <button
                      className="px-2 py-1 text-sm bg-green-500 text-white rounded"
                      onClick={() => new Audio(p.audio).play()}
                    >
                      🔊 Play
                    </button>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Meanings */}
          {entry.meanings?.map((m, i) => (
            <div key={i} className="mt-2">
              <p className="font-semibold capitalize">{m.partOfSpeech}</p>
              <ul className="list-disc ml-6">
                {m.definitions.map((d, j) => (
                  <li key={j} className="mb-2">
                    {d.definition}
                    {d.example && (
                      <p className="text-sm text-gray-500">e.g., {d.example}</p>
                    )}
                    {d.synonyms?.length > 0 && (
                      <div className="mt-1 flex flex-wrap gap-2">
                        {d.synonyms.slice(0, 5).map((syn, k) => (
                          <span
                            key={k}
                            className="px-2 py-1 text-sm bg-blue-500 text-white rounded cursor-pointer"
                            onClick={() => onSynonymClick(syn)}
                          >
                            {syn}
                          </span>
                        ))}
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
