import { Request, Response } from "express";
import { getRepository, getTreeRepository, Repository } from "typeorm";
import { TmdcMsn } from "../entity/TmdcMsn";
import { TmdcPoste } from "../entity/TmdcPoste";
import { Line } from "../entity/Line";
import { TmdcGti } from "../entity/TmdcGti";
import { Chapter } from "../entity/Chpater";
class TmdcMsnController {
  static addTmdcMsn = async (req: Request, res: Response) => {
      console.log(req.body)
      const currentMsn = req.body;
      const tmdcMsn = new TmdcMsn();
      tmdcMsn.msnNumber = currentMsn.msnNumber;
      tmdcMsn.responsable = currentMsn.responsable;
      tmdcMsn.start = currentMsn.start;
      tmdcMsn.end = currentMsn.end; 
      tmdcMsn.programCode = currentMsn.programCode;
      tmdcMsn.siteId = currentMsn.siteId;
      try {
        const isTmdcMsnExist = await getRepository(TmdcMsn).findOne({
          where: {
            msnNumber: currentMsn.msnNumber,
            programCode: currentMsn.programCode,
            siteId: currentMsn.siteId,
          },
        });
        if (!isTmdcMsnExist) {
          await getRepository(TmdcMsn).save(tmdcMsn);
          for (let j = 0; j < currentMsn.postes.length; j++) {
            const poste = new TmdcPoste();
            poste.name = currentMsn.postes[j].name;
            poste.tmdcMsn = tmdcMsn;
            await getRepository(TmdcPoste).save(poste);
            if (currentMsn.postes[j].lines) {
              for (let i = 0; i < currentMsn.postes[j].lines.length; i++) {
                const line = currentMsn.postes[j].lines[i];
                const newLine = new Line();
                newLine.id = line.id;
                newLine.title = line.title;
                newLine.tmdcPoste = poste;
                newLine.try =line.try
                await getRepository(Line).save(newLine);
                if (line.gtis) {
                  for (let t = 0; t < line.gtis.length; t++) {
                    const newGti = new TmdcGti();
                    const gti = line.gtis[t];

                    newGti.title = gti.title;
                    newGti.groupId = gti.groupId;
                    newGti.isDuplicated = gti.isDuplicated;
                    newGti.line = newLine;
                    newGti.start = gti.start;
                    newGti.wo = gti.wo;
                    newGti.className = gti.className;
                    newGti.uiId = gti.uiId;
                    newGti.status = gti.status;
                    newGti.gtiDuration = gti.gtiDuration;
                    newGti.parentId = gti.parentId;
                    newGti.go = gti.go;
                    newGti.noGo = gti.noGo;
                    await getRepository(TmdcGti).save(newGti);
                    if(gti.chapters && gti.chapters.length > 0){
                      console.log(gti.chapters);
                      
                      for (let c =0; c< gti.chapters.length; c++){
                        const newChapter = new Chapter()
                        const chapter = gti.chapters[c];
                        newChapter.numbering = chapter.numbering;
                        newChapter.status=chapter.status;
                        newChapter.title =chapter.title;
                        newChapter.tmdcGti= newGti
                        newChapter.alreadyPlace = chapter.alreadyPlace;
                        newChapter.chapterDuration = chapter.chapterDuration
                        await getRepository(Chapter).save(newChapter)
                      }
                    }
                  }
                }
              }
            }
          }
        }
      } catch (e) {
        console.log("EXCEPTION", e);
      }
    // }

    const result = await getRepository(TmdcMsn).findOne({
      relations: [
        "postes",
        "postes.lines",
        "postes.lines.gtis",
                "postes.lines.gtis.chapters",

        "postes.lines.gtis.line",
      ],
    });
    return res.json(result);
  };

  static getTmdcMsn = async (req: Request, res: Response) => {
    const tmdcMsn = await getRepository(TmdcMsn).findOne({
      where: {
        msnNumber: req.params.msnNumber,
        programCode: req.params.programCode,
        siteId: req.params.siteId,
      },
      relations: [
        "postes",
        "postes.lines",
        "postes.lines.gtis",
        "postes.lines.gtis.chapters",

        "postes.lines.gtis.line",
      ],
    });

    return res.json(tmdcMsn);
  };

  static updateTmdcGti = async (req: Request, res: Response) => {
    const gtis = req.body.gtis;
    for (let i = 0; i < gtis.length; i++) {
      const gti = await getRepository(TmdcGti).findOne(gtis[i].idTmdcGti);
      if (gti) {
        getRepository(TmdcGti).merge(gti, gtis[i]);
        await getRepository(TmdcGti).save(gti);
      }
    }
    const condition = {
      msnNumber: req.body.msnNumber,
      programCode: req.body.programCode,
      siteId: req.body.siteId,
    };

    const result = await getRepository(TmdcMsn).findOne({
      where: condition,
      relations: [
        "postes",
        "postes.lines",
        "postes.lines.gtis",
        "postes.lines.gtis.chapters",

        "postes.lines.gtis.line",
      ],
    });
    return res.json(result);
  };

  static allTmdcMsns = async (req: Request, res: Response) => {
    const condition = {
      programCode: req.params.programCode,
      siteId: req.params.siteId,
    };

    const result = await getRepository(TmdcMsn).find({
      where: condition,
      relations: [
        "postes",
        "postes.lines",
        "postes.lines.gtis",
        "postes.lines.gtis.chapters",

        "postes.lines.gtis.line",
      ],
    });
    return res.json(result);
  };


  static deleteGtis = async (req: Request, res: Response) => {

    const gtisIds = req.body.gtis;
    console.log(gtisIds)
    if(gtisIds && gtisIds.length >0){
      await getRepository(TmdcGti).delete(gtisIds)
    }
  
    const condition = {
      msnNumber: req.body.msnNumber,
      programCode: req.body.programCode,
      siteId: req.body.siteId,
    };

    const result = await getRepository(TmdcMsn).findOne({
      where: condition,
      relations: [
        "postes",
        "postes.lines",
        "postes.lines.gtis",
        "postes.lines.gtis.chapters",

        "postes.lines.gtis.line",
      ],
    });
    return res.json(result);
  };


  
  static addTmdcGtis = async (req: Request, res: Response) => {

    const gtis = req.body.gtis
  for (let i=0; i <gtis.length; i++){
    const gti = gtis[i]
    const newGti = new TmdcGti();
     getRepository(TmdcGti).merge(newGti, gti)
     await getRepository(TmdcGti).save(newGti)
     if(gti.chapters && gti.chapters.length >0){
      for (let c =0; c< gti.chapters.length; c++){
        const newChapter = new Chapter()
        const chapter = gti.chapters[c];
        newChapter.numbering = chapter.numbering;
        newChapter.status=chapter.status;
        newChapter.title =chapter.title;
        newChapter.tmdcGti= newGti;
        newChapter.alreadyPlace = chapter.alreadyPlace;
        newChapter.chapterDuration =chapter.chatperDuration;
        await getRepository(Chapter).save(newChapter)
      }
 
   }
  }
  
    const condition = {
      msnNumber: req.body.msnNumber,
      programCode: req.body.programCode,
      siteId: req.body.siteId,
    };

    const result = await getRepository(TmdcMsn).findOne({
      where: condition,
      relations: [
        "postes",
        "postes.lines",
        "postes.lines.gtis",
        "postes.lines.gtis.chapters",

        "postes.lines.gtis.line",
      ],
    });
    return res.json(result);
  };


  static updateTmdcGtis = async (req: Request, res: Response) => {
    const gtis = req.body.gtis
    console.log(gtis);
    for (let i = 0; i< gtis.length; i++){
      const gti = gtis[i];
      
      const gtiTmp = await getRepository(TmdcGti).findOne({
        where: {
          idTmdcGti: gti.idTmdcGti,
       
        },
        relations: [
          "chapters"
        ]
      });
   
      
     if(gtiTmp){
       if(gti.toDelete){
         await getRepository(TmdcGti).delete(gti.idTmdcGti);
       } else  if(gti.inEdit){
         const ids =gtiTmp.chapters.map(chap=> chap.id)
         if(ids && ids.length > 0) {
          await getRepository(Chapter).delete(ids)
         }  

         getRepository(TmdcGti).merge(gtiTmp, gti)
         console.log("gtiTmp", gtiTmp)
         await getRepository(TmdcGti).save(gtiTmp) 
         if(gti.chapters && gti.chapters.length >0){
          for (let c =0; c< gti.chapters.length; c++){
            const newChapter = new Chapter()
            const chapter = gti.chapters[c];
            newChapter.numbering = chapter.numbering;
            newChapter.status=chapter.status;
            newChapter.title =chapter.title;
            newChapter.tmdcGti= gtiTmp;
            newChapter.alreadyPlace = chapter.alreadyPlace;
            newChapter.chapterDuration =chapter.chatperDuration;
            await getRepository(Chapter).save(newChapter)
          }
  
       }
       } else{}

     } else {
    
       
      const newGti = new TmdcGti();
      newGti.title = gti.title;
      newGti.groupId = gti.groupId;
      newGti.isDuplicated = gti.isDuplicated;
      newGti.line = gti.line;
      newGti.start = gti.start;
      newGti.wo = gti.wo;
      newGti.className = gti.className;
      newGti.uiId = gti.uiId;
      newGti.status = gti.status;
      newGti.gtiDuration = gti.gtiDuration;  
      newGti.parentId = gti.parentId;
      newGti.go = gti.go;
      newGti.noGo = gti.noGo;
      await getRepository(TmdcGti).save(newGti);
      if(gti.chapters && gti.chapters.length >0){
        for (let c =0; c< gti.chapters.length; c++){
          const newChapter = new Chapter()
          const chapter = gti.chapters[c];
          newChapter.numbering = chapter.numbering;
          newChapter.status=chapter.status;
          newChapter.title =chapter.title;
          newChapter.tmdcGti= newGti;
          newChapter.alreadyPlace = chapter.alreadyPlace;
          newChapter.chapterDuration =chapter.chatperDuration;
          await getRepository(Chapter).save(newChapter)
        }

     }
      
    }  
  }
    const condition = {
      msnNumber: req.body.msnNumber,
      programCode: req.body.programCode,
      siteId: req.body.siteId,
    };

    const result = await getRepository(TmdcMsn).findOne({
      where: condition,
      relations: [
        "postes",
        "postes.lines",
        "postes.lines.gtis",
        "postes.lines.gtis.chapters",
        "postes.lines.gtis.line",
      ],
    });
 
    return res.json(result);

  };


  static editGti = async (req: Request, res: Response) => {
    const gti = req.body.gti;
   await getRepository(TmdcGti).save(gti);
   
    const condition = {
      msnNumber: req.body.msnNumber,
      programCode: req.body.programCode,
      siteId: req.body.siteId,
    };

    const result = await getRepository(TmdcMsn).findOne({
      where: condition,
      relations: [
        "postes",
        "postes.lines",
        "postes.lines.gtis",
        "postes.lines.gtis.chapters",

        "postes.lines.gtis.line",
      ],
    });
    return res.json(result);
  };

}
export default TmdcMsnController;

  