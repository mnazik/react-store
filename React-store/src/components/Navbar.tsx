import { Link } from 'react-router-dom';

export default function Navbar() {
    return (
        <nav className="bg-slate-900 text-white shadow-lg sticky top-0 z-50">
            <div className='max-w-6xl mx-auto px-4 py-4 flex justify-between items-center'>
                <Link to='/' className='text-2xl font-bold bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text
                text-transparent'>
                    React Store
                </Link>
                <div ClassName="flex gap-6 font-medium">
                    <Link to='/' className='hover: text-blue-400 transition-colors'>
                        Главная
                    </Link>
                    <Link to='/favorites' className='hover: text-blue-400 transition-colors'>
                        Избранное
                    </Link>
                </div>
            </div>
        </nav>
    );
}