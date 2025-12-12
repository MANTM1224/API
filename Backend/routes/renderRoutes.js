import { Router } from 'express';
import * as productController from '../controllers/productcontroller.js';

const router = Router();

router.use('/iniciarSs',(req, res)=>{

res.render('iniciarSs');
} );
router.use('/crearAcc',(req, res)=>{
    res.render('crearAcc');

});
export default router;