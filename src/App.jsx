import { useState } from 'react';
import { RadioGroup } from '@headlessui/react';
import { BsStarFill } from 'react-icons/bs';
import classNames from 'classnames';

const RadioGroupStars = ({ items }) => {
  const [value, setValue] = useState(null);
  const [comment, setComment] = useState('');
  const [showThanks, setShowThanks] = useState(false);
  const [error, setError] = useState('');

  const handleCommentChange = (event) => {
    setComment(event.target.value);
    setError('');
  };

  const handleSend = () => {
    if (!comment.trim()) {
      setError('Por favor, escriba un comentario.');
      return;
    }

    if (!value) {
      setError('Por favor, elija una opción de calificación.');
      return;
    }

    // Mostrar el mensaje de agradecimiento
    setShowThanks(true);

    // Reiniciar los estados de comentario y selección de radio después de 2 segundos
    setTimeout(() => {
      setComment('');
      setValue(null);
      setShowThanks(false);
      setError('');
    }, 2000);
  };

  return (
    <div className="flex justify-center">
      <div className="w-full max-w-lg bg-white shadow-md rounded p-4">
        <div className="flex">
          <textarea
            value={comment}
            onChange={handleCommentChange}
            className="w-1/2 p-2 border border-orange-300 rounded mr-2"
            maxLength={128}
          />
          <div className="w-1/2">
            <RadioGroup
              value={value}
              onChange={setValue}
              className="w-full my-1"
            >
              <RadioGroup.Label className="sr-only">
                Choose a option
              </RadioGroup.Label>
              <div className="flex flex-row-reverse justify-center gap-1">
                {[...items].reverse().map((item) => (
                  <RadioGroup.Option
                    key={item}
                    value={item}
                    className={({ active, checked }) =>
                      classNames(
                        'cursor-pointer text-gray-200',
                        'flex-1 hover:text-yellow-400',
                        'peer',
                        'peer-hover:text-yellow-400',
                        active ? 'text-yellow-500' : '',
                        checked ? 'text-yellow-500' : '',
                        value >= item ? 'text-yellow-500' : ''
                      )
                    }
                  >
                    <RadioGroup.Label as={BsStarFill} className="w-6 h-6" />
                  </RadioGroup.Option>
                ))}
              </div>
            </RadioGroup>
            <button
              className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded mt-4 ml-24"
              onClick={handleSend}
            >
              Enviar
            </button>
            {error && <p className="text-red-500 mt-2">{error}</p>}
          </div>
        </div>
        {showThanks && (
          <div className="absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center">
            <div className="bg-orange-300 p-4 rounded shadow text-white">
              <p>Gracias por su opinión</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

function App() {
  return (
    <div className="flex w-full justify-center">
      <div className="m-6">
        <RadioGroupStars items={[1, 2, 3, 4, 5]} />
      </div>
    </div>
  );
}

export default App;
