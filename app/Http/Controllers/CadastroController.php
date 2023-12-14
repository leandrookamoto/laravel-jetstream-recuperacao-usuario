<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Cadastro;

class CadastroController extends Controller
{
    public function getAllCadastro() {
        $cadastro = Cadastro::get()->toJson(JSON_PRETTY_PRINT);
     return response($cadastro, 200);
     }
 
     public function createCadastro(Request $request)
    {
        // Criar um novo usuário com base nos dados recebidos
        $user = new Cadastro;
        $user->nome = $request->nome;
        $user->email = $request->email;
        $user->setor = $request->setor;
        $user->administrador = $request->administrador; 

        // Salvar o novo usuário no banco de dados
        $user->save();

  
    }
 
 
     public function updateAvaliacao(Request $request, $id) {
       if (Cadastro::where('id', $id)->exists()) {
         $funcionario = Cadastro::find($id);
         $funcionario->avaliacoes = is_null($request->avaliacoes) ? $funcionario->avaliacoes : $request->avaliacoes;
         $funcionario->save();
 
         return response()->json([
             "message" => "records updated successfully"
         ], 200);
         } else {
         return response()->json([
             "message" => "Description not found"
         ], 404);
     }
     }
 
    //  public function deleteDescription ($id) {
    //     if(TodoList::where('id', $id)->exists()) {
    //      $description = TodoList::find($id);
    //      $description->delete();
 
    //      return response()->json([
    //        "message" => "records deleted"
    //      ], 202);
    //    } else {
    //      return response()->json([
    //        "message" => "Description not found"
    //      ], 404);
    //    }
     //}
}
