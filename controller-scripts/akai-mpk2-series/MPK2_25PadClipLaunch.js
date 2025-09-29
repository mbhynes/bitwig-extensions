var PadClipLauncher = new PadMode();


// Removed bank A/B functionality - now works with 4 tracks only


PadClipLauncher.init = function() {
    if (displayHelpText) {
        host.showPopupNotification("Pads: Clip Launch: Tracks 1 - 4");
    }

    PadNotes.setShouldConsumeEvents(false);
    PadNotes.setKeyTranslationTable(PadMIDITable.OFF);

    // Update LEDs for 4 tracks only (16x4 grid)
    for(var x = 0; x < 4; x++) {
        for (var y = 0; y < 16; y++) {
            PadClipLauncher.updateClipLED(x,y);
        }
    }
}

PadClipLauncher.handleMIDI = function (data1,data2) {
    var pressed = data2 > 0;
    if (pressed == true) {
        // Map pad to track (0-3) and clip slot
        var track = (data1 - 36) % 4;
        var clip = PadClipLauncher.getClipForMidiNote(data1);
      if (shifted) {
        trackBank.getTrack(track).stop();
      } else {
        trackBank.getTrack(track).getClipLauncherSlots().launch(clip);
      }
    }
}


PadClipLauncher.clipContentObs = function (track,slot, hasContent) {
    PadMode.prototype.clipContentObs(track,slot,hasContent);
    this.updateClipLED(track,slot);
}

PadClipLauncher.clipRecordObs = function (track,slot,isRecording) {
    PadMode.prototype.clipRecordObs(track,slot,isRecording);
    this.updateClipLED(track,slot);
}

PadClipLauncher.clipPlayingObs = function(track,slot,isPlaying) {
    PadMode.prototype.clipPlayingObs(track,slot,isPlaying);
    this.updateClipLED(track,slot);
}

PadClipLauncher.getPadFromTrackSlot = function (track,slot) {
    
    var Pad;
    var newslot;

    // Simplified mapping for 4 tracks only
    if ( slot < 2) {
        newslot = Math.abs(slot - 1);
        Pad = track + (newslot * 4);
    }

    else if ( slot < 4) {
        newslot = Math.abs(slot - 3) + 2;
        Pad = track + (newslot * 4);
    }

    else if ( slot < 6) {
        newslot = Math.abs(slot - 5) + 4;
        Pad = track + (newslot * 4);
    }

    else  {
        newslot = Math.abs(slot - 7) + 6;
        Pad = track + (newslot * 4);
    }
    
    return Pad;
}

PadClipLauncher.updateClipLED = function(track, slot) {
    
    // Only handle tracks 0-3 (4 tracks total)
    if ( track < 4 )  {
        Pad = this.getPadFromTrackSlot(track,slot);
        var clipData = clipSlots[track][slot];
        if(clipData.recording == true) {
            lightPad (padColors['Red'],Pad,"Off");
        }

        else if(clipData.playing == true) {
            lightPad (padColors['Green'],Pad,"Off");
        }

        else {
            lightPad (clipData.color,Pad,"Off");
        }
    }

}

PadClipLauncher.getClipForMidiNote = function (note) {
    note = note - 36;
    
   if (note < 8) {
       return  Math.abs (Math.floor(note / 4) - 1);
    }
    
   else if (note < 16) {
       note = note - 8;
       return  Math.abs (Math.floor(note / 4) -1) + 2;
   }

   else if (note < 24) {
       note = note - 16;
       return  Math.abs (Math.floor(note / 4) -1) + 4;
   }
   else if (note < 32) {
       note = note - 24;
       return  Math.abs (Math.floor(note / 4) -1) + 6;
   }
}





