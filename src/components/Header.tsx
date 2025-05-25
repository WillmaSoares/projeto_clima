import { AppBar, Toolbar, Typography, IconButton, Button } from "@mui/material";
import HomeIcon from '@mui/icons-material/Home';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate, useLocation } from "react-router-dom";

export function Header() {
    const nav = useNavigate();
    const { pathname } = useLocation();

    const titulos: Record<string, string> = {
        '/': 'Clima App',
        '/clima': 'Clima Atual',
        '/favoritos': 'Cidades Favoritas'
    };
    const titulo = titulos[pathname] || 'Clima App';

    return (
        <AppBar position="static">
        <Toolbar>
            <Typography variant="h6" sx={{ flexGrow: 1 }}>
            {titulo}
            </Typography>

            {/* Botões para a tela /clima */}
            {pathname === '/clima' && (
            <>
                <IconButton color="inherit" onClick={() => nav('/')}>
                <HomeIcon />
                </IconButton>
                <Button
                color="inherit"
                startIcon={<FavoriteIcon />}
                onClick={() => nav('/favoritos')}
                >
                Favoritos
                </Button>
            </>
            )}

            {/* Botões para a tela /favoritos */}
            {pathname === '/favoritos' && (
            <>
                <Button
                color="inherit"
                startIcon={<HomeIcon />}
                onClick={() => nav('/')}
                >
                Tela Inicial
                </Button>
                <Button
                color="inherit"
                startIcon={<ArrowBackIcon />}
                onClick={() => nav('/clima')}
                >
                Clima
                </Button>
            </>
            )}
        </Toolbar>
        </AppBar>
    );
}
