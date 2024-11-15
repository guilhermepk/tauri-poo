// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use std::process::Command;

fn main() {
    // Inicia o servidor NestJS
    Command::new("node")
        .args(&["server/dist/main.js"]) // Caminho para o arquivo do NestJS
        .spawn()
        .expect("Falha ao iniciar o servidor NestJS");

    // Inicia a aplicação Tauri
    tauri::Builder::default()
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
