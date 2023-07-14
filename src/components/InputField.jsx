
const InputField = ({name, onChange, value, placeholder}) => {
    
  return (
    <div>
      <input
        className="w-full bg-[#f9f9f9] h-[50px] mb-5 px-4 border-b-2 border-black outline-none focus:border-[#05b851] focus:bg-[#e5f9e8a6]"
        type="text"
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />
    </div>
  );
}

export default InputField