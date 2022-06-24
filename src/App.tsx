import { useEffect, useRef, useState } from "react";

const App: React.FC = () => {
  const [ visible, setVisible ] = useState(false);
  const [ imgSrc, setImgSrc ] = useState('https://images.unsplash.com/photo-1655960557052-6c746fc47034?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=5&h=5&q=5');
  const options = {
    // root: // scrollable parent element (html -> default)
    // rootMargin: // margin of root ('0px' -> default)
    threshold: 1.0 // run callback when <threshold> % of element is in viewport
  }

  // registering observer
  const observer = new IntersectionObserver(function(entries) {
    // entries : target element ( because the target element maybe not just one element )
    const [ target ] = entries // we just have one target element lmao 
    if(target.isIntersecting) {
      setVisible(true);
      setImgSrc('https://images.unsplash.com/photo-1655960557052-6c746fc47034?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=1280&q=60');
    }  

  }, options);

  // target element
  const target = useRef<null | HTMLDivElement>(null);

  // event
  useEffect(() => {

    // if not null
    if(target.current) observer.observe(target.current);
    console.log(visible);

    // unmount
    return () => {
      if(target.current) observer.unobserve(target.current);
    }

  }, [target, options]); // idk why to add options rn, but its work 

  return (
    <div className="p-2 flex space-y-4 flex-col justify-center items-center">
      <div className="w-6/12 aspect-square bg-slate-500"></div>
      <div className="w-6/12 aspect-square bg-slate-500"></div>
      <div className="w-6/12 aspect-square bg-slate-500"></div>
      <div className="w-6/12 aspect-square bg-slate-500"></div>
      <div className="w-6/12 aspect-square bg-slate-500"></div>
      <div ref={target} className="w-6/12 aspect-square overflow-hidden bg-slate-500">
        <img className={`w-full object-cover transition-all ${ !visible && 'blur-md' }`} src={imgSrc} />
      </div>
      <div className="w-6/12 aspect-square bg-slate-500"></div>
    </div>
  )
}

export default App
