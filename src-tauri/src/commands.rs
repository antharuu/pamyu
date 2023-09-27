use serde::{Serialize, Deserialize};
use std::process::Command;

#[derive(Serialize, Deserialize)]
pub struct CustomResult {
    success: bool,
    message: Option<String>,
}

impl From<std::io::Result<()>> for CustomResult {
    fn from(result: std::io::Result<()>) -> Self {
        match result {
            Ok(_) => CustomResult {
                success: true,
                message: None,
            },
            Err(e) => CustomResult {
                success: false,
                message: Some(e.to_string()),
            },
        }
    }
}

fn execute_command(command: &str, args: &[&str]) -> std::io::Result<()> {
    Command::new(command)
        .args(args)
        .spawn()?;
    Ok(())
}

#[tauri::command]
pub fn execute_renpy(path: &str) -> CustomResult {
    let renpy_path = format!("{}/renpy.exe", path);
    execute_command(&renpy_path, &[]).into()
}

#[tauri::command]
pub fn execute_game(path: &str, game_path: &str) -> CustomResult {
    let renpy_path = format!("{}/renpy.exe", path);
    execute_command(&renpy_path, &[game_path]).into()
}