const FormatGarment = ({ garment, name, reference, categoryProduct }) => {
    return (
      <div className="mt-3">
        <div className="bg-zinc-200 rounded flex justify-between items-center pl-2 pt-4 pr-2 text-zinc-600 uppercase">
          <h2 className="mb-4 text-md ">
            <span className="font-bold">{name || 'N/A'}</span>
          </h2>
          <h3 className="text-md mb-4">
            Referencia: <span className="font-bold">{reference || 'N/A'}</span>
          </h3>
          <h4 className="text-md mb-4">
            Categoría: <span className="font-bold">{categoryProduct || 'N/A'}</span>
          </h4>
        </div>
      </div>
    );
  };
  

export default FormatGarment;