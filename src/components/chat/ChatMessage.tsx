type ChatMessageProps = {
  message: string;
  accentColor: string;
  name: string;
  isSelf: boolean;
  highlight_word_count: number;
  isSelected: boolean;
  pos: number;
  id: string;
  parent_id: string;
  alt_ids: string[];
  conversation_id: string;
  character_id: string;
  model: string;
  type: string;
};

export const ChatMessage = ({
  name,
  message,
  accentColor,
  isSelf,
  highlight_word_count,
  isSelected,
  pos,
  alt_ids,
  id
}: ChatMessageProps) => {
  const words = message.split(/(\s+)/);
  let highlightedWords = 0;

  const coloredMessage = words.map((word, index) => {
    if (word.trim() === '') {
      return <span key={index}>{word}</span>;
    }

    highlightedWords++;

    if (isSelf) {
      return <span key={index} className="text-gray-300">{word}</span>;
    } else {
      return (
        <span
          key={index}
          className={`${
            highlightedWords <= highlight_word_count
              ? `text-${accentColor}-800`
              : `text-${accentColor}-800`
          }`}
        >
          {word}
        </span>
      );
    }
  });

  const borderColorClass = isSelected
    ? `border-${accentColor}-400`
    : isSelf
    ? "border-gray-700"
    : `border-${accentColor}-700`;

  return (
    <div className="flex flex-col">
      <div className="relative">
        <div className={`border ${borderColorClass} p-2 rounded`}>
        <div
            className={`absolute left-2 top-0 px-1 transform -translate-y-1/2 bg-black text-${
              isSelf ? "gray-700" : accentColor + "-800 text-ts-" + accentColor
            } uppercase text-xs`}
          >
            [ {pos} ]
          </div>
          <div
            className={`absolute left-12 top-0 px-1 transform -translate-y-1/2 bg-black text-${
              isSelf ? "gray-700" : accentColor + "-800 text-ts-" + accentColor
            } uppercase text-xs`}
          >
            {name}
          </div>
          <div
            className={`absolute right-4 top-0 px-1 transform -translate-y-1/2 bg-black text-${
              isSelf ? "gray-700" : accentColor + "-800 text-ts-" + accentColor
            } text-xs`}
          >
            alt {alt_ids?.map((alt_id, index) => (
              <span key={index}>
                {alt_id === id ? `[ ${index} ]` : ` ${index} `}
              </span>
            )) || 'No alternate IDs'}
          </div>
          <div
            className={`text-sm ${
              isSelf ? "" : "drop-shadow-" + accentColor
            } mt-2`}
          >
            {coloredMessage}
          </div>
        </div>
      </div>
    </div>
  );
};