// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

mod files;
mod project;
mod save;
mod update_script;
mod commands;
mod import;

use files::{list_files_from_path, delete_file};
use project::{load_project, save_new_script};
use save::{load_data, save_data};
use update_script::{update_script, load_script};
use commands::{execute_renpy, execute_game};
use import::get_all_project_renpy_files;

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![
            list_files_from_path,
            load_project,
            save_new_script,
            save_data,
            load_data,
            update_script,
            load_script,
            execute_renpy,
            execute_game,
            get_all_project_renpy_files,
            delete_file
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
