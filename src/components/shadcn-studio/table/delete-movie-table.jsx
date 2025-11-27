import { useEffect, useState } from 'react';
import $axios from '@/api/accessor';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import "./button.css";
import { $api } from '@/api/api';
import { API } from '@/api/endpoints';
import { CircleLoader, ClockLoader } from "react-spinners";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Trash2 } from 'lucide-react';
import toast from 'react-hot-toast';
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle,} from '@/components/ui/dialog'
import { ScrollArea } from '@/components/ui/scroll-area'
import EditMovieForm from '@/components/edit-movie-form';
import { useCallback } from 'react';

const EditAndDeleteMovieTable = () => {
    const [movies, setMovies] = useState([]);
    const [deletingId, setDeletingId] = useState(null);
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const [selectedMovie, setSelectedMovie] = useState(null);

    const fetchMovies = useCallback(async () => {
        setLoading(true);
        setMovies([]);

        try {
            const res = await $axios.get($api(API["all-movie"]));

            const mappedMovies = res?.data.data.map((movie) => ({
                id: movie.id,
                name: movie.name || "—",
                description: movie.description || "No description available",
                director: movie.director || "—",
                releaseDate: movie.releaseDate || "—",
                coverPhotoUrl:
                    movie.coverPhotoUrl?.startsWith("http") ||
                        movie.coverPhotoUrl?.startsWith("//")
                        ? movie.coverPhotoUrl
                        : "",
                backgroundImgUrl: movie.backgroundImgUrl || "",
                trailerUrl: movie.trailerUrl || "",
                genre: movie.genres || [],
                movieDuration: movie.movieDuration || "—",
                actors: movie.actors || [],
                starMovie: movie.starMovie ?? false,
            }));

            setMovies(mappedMovies);
        }
        catch (err) {
            console.error("Fetch movies error:", err);
            setMovies([]);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchMovies();
    }, [fetchMovies]);

    const handleDelete = async (id) => {
        try {
            setDeletingId(id);
            const res = await $axios.delete($api(`${API["delete-movie"]}/${id}`));
            const data = res?.data;

            if (data?.success) {
                toast.success("Movie deleted successfully");
                setMovies((prev) => prev.filter((m) => m.id !== id));
            } else {
                toast.error(data?.message || "Failed to delete movie");
            }
        } catch (err) {
            console.error("Delete movie error:", err);
        } finally {
            setDeletingId(null);
        }
    };
    return (
        <div className="w-full">
            <div className="[&>div]:rounded-sm [&>div]:border">
                <Table>
                    <TableHeader>
                        <TableRow className="hover:bg-transparent py-5">
                            <TableHead className={'font-bold'}>Name</TableHead>
                            <TableHead className={'text-center font-bold'}>Director</TableHead>
                            <TableHead className={'text-center font-bold'}>Movie Photo</TableHead>
                            <TableHead className={'text-center font-bold'}>Release Date</TableHead>
                            <TableHead className="text-end font-bold">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {loading ? (
                            <TableRow>
                                <TableCell colSpan={6}>
                                    <div className={'flex justify-center py-20'}><ClockLoader color="#fff" size={100} speedMultiplier={2} /></div>
                                </TableCell>
                            </TableRow>
                        ) : movies.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={6} className="text-center py-10">No movies found</TableCell>
                            </TableRow>
                        ) : (
                            movies.map((movie) => (
                                <TableRow key={movie.id}>
                                    <TableCell>{movie.name}</TableCell>
                                    <TableCell><div className='flex justify-center'>{movie.director}</div></TableCell>
                                    <TableCell>
                                        <div className='h-20 flex justify-center'>
                                            <img className="h-full object-cover rounded" src={movie.coverPhotoUrl && movie.coverPhotoUrl.startsWith("http")
                                                ? movie.coverPhotoUrl : "https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/330px-No-Image-Placeholder.svg.png"} onError={(e) => {
                                                    e.currentTarget.src = "https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/330px-No-Image-Placeholder.svg.png";
                                                }} />
                                        </div>
                                    </TableCell>
                                    <TableCell><div className='flex justify-center'>{movie.releaseDate}</div></TableCell>
                                    <TableCell><div className="flex items-center justify-end gap-3">
                                        <Button variant='outline' size={0} className={'rounded-2xl'} onClick={() => { setSelectedMovie(movie); setOpen(true); }}>
                                            <div className="editBtn"><svg height="1em" viewBox="0 0 512 512">
                                                <path d="M410.3 231l11.3-11.3-33.9-33.9-62.1-62.1L291.7 89.8l-11.3 11.3-22.6 22.6L58.6 322.9c-10.4 10.4-18 23.3-22.2 37.4L1 480.7c-2.5 8.4-.2 17.5 6.1 23.7s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L387.7 253.7 410.3 231zM160 399.4l-9.1 22.7c-4 3.1-8.5 5.4-13.3 6.9L59.4 452l23-78.1c1.4-4.9 3.8-9.4 6.9-13.3l22.7-9.1v32c0 8.8 7.2 16 16 16h32zM362.7 18.7L348.3 33.2 325.7 55.8 314.3 67.1l33.9 33.9 62.1 62.1 33.9 33.9 11.3-11.3 22.6-22.6 14.5-14.5c25-25 25-65.5 0-90.5L453.3 18.7c-25-25-65.5-25-90.5 0zm-47.4 168l-144 144c-6.2 6.2-16.4 6.2-22.6 0s-6.2-16.4 0-22.6l144-144c6.2-6.2 16.4-6.2 22.6 0s6.2 16.4 0 22.6z"></path>
                                            </svg></div>
                                        </Button>
                                        <AlertDialog>
                                            <AlertDialogTrigger asChild>
                                                <button className="bin-button" disabled={deletingId === movie.id}>
                                                    {deletingId === movie.id ? (<CircleLoader color="#fff" size={30} />) : (
                                                        <><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 39 7" className="bin-top">
                                                            <line strokeWidth="4" stroke="white" y2="5" x2="39" y1="5"></line><line strokeWidth="3" stroke="white" y2="1.5" x2="26.0357" y1="1.5" x1="12"></line></svg>
                                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 33 39" className="bin-bottom">
                                                                <mask fill="white" id="path-1-inside-1_8_19">
                                                                    <path d="M0 0H33V35C33 37.2091 31.2091 39 29 39H4C1.79086 39 0 37.2091 0 35V0Z"></path>
                                                                </mask><path mask="url(#path-1-inside-1_8_19)" fill="white" d="M0 0H33H0ZM37 35C37 39.4183 33.4183 43 29 43H4C-0.418278 43 -4 39.4183 -4 35H4H29H37ZM4 43C-0.418278 43 -4 39.4183 -4 35V0H4V35V43ZM37 0V35C37 39.4183 33.4183 43 29 43V35V0H37Z"></path>
                                                                <path strokeWidth="4" stroke="white" d="M12 6L12 29"></path><path strokeWidth="4" stroke="white" d="M21 6V29"></path>
                                                            </svg><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 89 80" className="garbage">
                                                                <path fill="white" d="M20.5 10.5L37.5 15.5L42.5 11.5L51.5 12.5L68.75 0L72 11.5L79.5 12.5H88.5L87 22L68.75 31.5L75.5066 25L86 26L87 35.5L77.5 48L70.5 49.5L80 50L77.5 71.5L63.5 58.5L53.5 68.5L65.5 70.5L45.5 73L35.5 79.5L28 67L16 63L12 51.5L0 48L16 25L22.5 17L20.5 10.5Z"></path></svg></>
                                                    )}</button>
                                            </AlertDialogTrigger>
                                            <AlertDialogContent>
                                                <AlertDialogHeader>
                                                    <div className="flex items-center gap-2"><Trash2 className="size-5 text-destructive" /><AlertDialogTitle>Delete movie</AlertDialogTitle></div>
                                                    <AlertDialogDescription>
                                                        This will permanently delete the movie and all associated information.
                                                        This action cannot be undone.
                                                    </AlertDialogDescription>
                                                </AlertDialogHeader>
                                                <AlertDialogFooter>
                                                    <AlertDialogCancel className={'cursor-pointer'}>Cancel</AlertDialogCancel>
                                                    <AlertDialogAction onClick={() => handleDelete(movie.id)} className="bg-red-700 cursor-pointer text-white hover:bg-red-700/90">Delete movie</AlertDialogAction>
                                                </AlertDialogFooter>
                                            </AlertDialogContent>
                                        </AlertDialog>
                                    </div></TableCell></TableRow>)))}
                    </TableBody>
                </Table>
            </div>
            <Dialog open={open} onOpenChange={(state) => {
                setOpen(state);
                if (window.lenis) {
                    if (state) { window.lenis.stop(); } else { window.lenis.start(); }
                }
            }}>
                <DialogContent className="mb-8 flex lg:min-w-5xl flex-col justify-between gap-0 p-0">
                    <DialogHeader className="contents text-center">
                        <DialogTitle className="p-[20px_10px_5px]">Edit Movie Form</DialogTitle>
                        <DialogDescription>Edit the selected movie information below</DialogDescription>
                    </DialogHeader><ScrollArea data-lenis-prevent className="flex-1 overflow-y-auto max-h-[90vh]"
                    > {selectedMovie && (
                        <EditMovieForm movieData={selectedMovie}
                            onSuccess={() => {
                                fetchMovies();
                                setOpen(false);
                                setSelectedMovie(null);
                            }}
                        />)}</ScrollArea>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default EditAndDeleteMovieTable;